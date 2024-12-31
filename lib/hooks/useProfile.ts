import { useState, useEffect } from 'react';
import { getContract } from '@/lib/web3';
import UserProfileContract from '../../build/contracts/UserProfile.json';

export interface Profile {
  userAddress: string;
  name: string;
  email: string;
  orderIds: number[];
  isRegistered: boolean;
}

export function useProfile(account: string | null) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account) {
      loadProfile();
    }
  }, [account]);

  const loadProfile = async () => {
    try {
      const contract = await getContract(UserProfileContract);
      const userProfile = await contract.methods.getProfile().call({ from: account });
      
      setProfile({
        userAddress: userProfile.userAddress,
        name: userProfile.name,
        email: userProfile.email,
        orderIds: userProfile.orderIds.map((id: string) => parseInt(id)),
        isRegistered: userProfile.isRegistered
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (name: string, email: string) => {
    try {
      const contract = await getContract(UserProfileContract);
      await contract.methods.updateProfile(name, email).send({ from: account });
      await loadProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const registerUser = async (name: string, email: string) => {
    try {
      const contract = await getContract(UserProfileContract);
      await contract.methods.registerUser(name, email).send({ from: account });
      await loadProfile();
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  return { profile, loading, updateProfile, registerUser, refreshProfile: loadProfile };
}