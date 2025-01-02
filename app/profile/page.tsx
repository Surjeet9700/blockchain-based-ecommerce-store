'use client';

import { useState, useEffect } from 'react';
import { useProfile } from '@/lib/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wallet, Edit2, Check, X, EclipseIcon as Ethereum, Bitcoin, Wallet2, CreditCard, Settings, MoreHorizontal } from 'lucide-react';
import web3 from '@/lib/web3';
import { connectWallet } from '@/lib/web3';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileSidebar } from '@/components/ProfileSidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export default function ProfilePage() {
  const [account, setAccount] = useState<string | null>(null);
  const { profile, loading, updateProfile, registerUser } = useProfile(account);
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [walletBalances, setWalletBalances] = useState({ eth: 0, btc: 0 });

  useEffect(() => {
    checkAccount();
  }, []);

  useEffect(() => {
    if (account) {
      fetchWalletBalances();
    }
  }, [account]);

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

  const fetchWalletBalances = async () => {
    if (account) {
      const ethBalance = await web3.eth.getBalance(account);
      setWalletBalances({ eth: parseFloat(web3.utils.fromWei(ethBalance, 'ether')), btc: 0.01 });
    }
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
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <ProfileSidebar />
        </aside>
        <main className="flex-1">
          <h1 className="text-3xl font-bold mb-6">
            {profile?.isRegistered ? 'Your Profile' : 'Create Profile'}
          </h1>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="wallet">
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Ethereum className="h-6 w-6 text-blue-500" />
                        <span>Ethereum Balance</span>
                      </div>
                      <span className="font-bold">{walletBalances.eth} ETH</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bitcoin className="h-6 w-6 text-orange-500" />
                        <span>Bitcoin Balance</span>
                      </div>
                      <span className="font-bold">{walletBalances.btc} BTC</span>
                    </div>
                    <Button className="w-full">
                      <Wallet2 className="mr-2 h-4 w-4" />
                      Add Funds
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-6 w-6 text-gray-500" />
                        <span>Credit Card ending in 1234</span>
                      </div>
                      <Button variant="outline">Remove</Button>
                    </div>
                    <Button className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add New Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <Switch id="notifications" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select defaultValue="light">
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Select Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="more">
              <Card>
                <CardHeader>
                  <CardTitle>More</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Advanced Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MoreHorizontal className="mr-2 h-4 w-4" />
                      Help & Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-700">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

