import { useState } from 'react';
import { User, ShoppingBag, CreditCard, Settings, HelpCircle } from 'lucide-react';
import { ProfileTab } from './ProfileTab';
import { WalletTab } from './WalletTab';
import { PaymentTab } from './PaymentTab';
import { SettingsTab } from './SettingsTab';
import { MoreTab } from './MoreTab';

export function ProfileSidebar({ account, profile, updateProfile, registerUser }) {
  const [selectedTab, setSelectedTab] = useState('profile');

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'profile':
        return <ProfileTab account={account} profile={profile} updateProfile={updateProfile} registerUser={registerUser} />;
      case 'wallet':
        return <WalletTab account={account} />;
      case 'payment':
        return <PaymentTab />;
      case 'settings':
        return <SettingsTab />;
      case 'more':
        return <MoreTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <nav className="space-y-1 w-64">
        {[
          { name: 'Profile', value: 'profile', icon: User },
          { name: 'Wallet', value: 'wallet', icon: ShoppingBag },
          { name: 'Payment', value: 'payment', icon: CreditCard },
          { name: 'Settings', value: 'settings', icon: Settings },
          { name: 'More', value: 'more', icon: HelpCircle },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => setSelectedTab(item.value)}
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
            {item.name}
          </button>
        ))}
      </nav>
      <main className="flex-1 p-4">
        {renderTabContent()}
      </main>
    </div>
  );
}