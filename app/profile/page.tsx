'use client';

import { useState, useEffect } from 'react';
import { useProfile } from '@/lib/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wallet } from 'lucide-react';
import web3 from '@/lib/web3';
import { connectWallet } from '@/lib/web3';
import { motion } from 'framer-motion';
import { ProfileSidebar } from '@/components/ProfileSidebar';

export default function ProfilePage() {
  const [account, setAccount] = useState<string | null>(null);
  const { profile, loading, updateProfile, registerUser } = useProfile(account);
  const { toast } = useToast();

  useEffect(() => {
    checkAccount();
  }, []);

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
      <ProfileSidebar 
        account={account} 
        profile={profile} 
        updateProfile={updateProfile} 
        registerUser={registerUser} 
      />
    </div>
  );
}