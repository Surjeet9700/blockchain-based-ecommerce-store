import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Edit2, Check } from 'lucide-react';

export function ProfileTab({ account, profile, updateProfile, registerUser }) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      if (profile?.isRegistered) {
        await updateProfile(name, email);
        toast({
          title: 'Success',
          description: 'Profile updated successfully!',
        });
      } else {
        await registerUser(name, email);
        toast({
          title: 'Success',
          description: 'Profile created successfully!',
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          disabled={!isEditing && profile?.isRegistered}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={!isEditing && profile?.isRegistered}
        />
      </div>
      {isEditing || !profile?.isRegistered ? (
        <Button type="submit" className="w-full" disabled={updating}>
          {updating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {profile?.isRegistered ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              {profile?.isRegistered ? 'Save Changes' : 'Create Profile'}
            </>
          )}
        </Button>
      ) : (
        <Button 
          type="button" 
          className="w-full" 
          onClick={() => setIsEditing(true)}
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      )}
    </form>
  );
}