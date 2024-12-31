'use client';

import { useState, useEffect } from 'react';
import { useProfile } from '@/lib/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wallet, Edit2, Check, X } from 'lucide-react';
import web3 from '@/lib/web3';
import { connectWallet } from '@/lib/web3';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const [account, setAccount] = useState<string | null>(null);
  const { profile, loading, updateProfile, registerUser } = useProfile(account);
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    checkAccount();
  }, []);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
    }
  }, [profile]);

  const checkAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const handleConnectWallet = async () => {
    try {
      const connectedAccount = await connectWallet();
      if (connectedAccount) {
        setAccount(connectedAccount);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to connect wallet.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast({
        title: 'Error',
        description: 'Failed to connect wallet. Please try again.',
        variant: 'destructive',
      });
    }
  };

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

  if (!account) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <h2 className="text-2xl font-semibold mb-4">Please connect your wallet</h2>
        <Button onClick={handleConnectWallet} className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </Button>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          {profile?.isRegistered ? 'Your Profile' : 'Create Profile'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            className="space-y-2"
            initial={false}
            animate={isEditing ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              disabled={!isEditing && profile?.isRegistered}
              className={isEditing ? 'border-primary' : ''}
            />
          </motion.div>

          <motion.div 
            className="space-y-2"
            initial={false}
            animate={isEditing ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={!isEditing && profile?.isRegistered}
              className={isEditing ? 'border-primary' : ''}
            />
          </motion.div>

          <AnimatePresence>
            {isEditing || !profile?.isRegistered ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  type="button" 
                  className="w-full" 
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {isEditing && profile?.isRegistered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <Button 
              type="button" 
              variant="outline"
              className="w-full" 
              onClick={() => {
                setIsEditing(false);
                setName(profile.name || '');
                setEmail(profile.email || '');
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

