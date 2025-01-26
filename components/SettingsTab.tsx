import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function SettingsTab() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Settings</h2>
      
      <div className="space-y-6">
      

        {/* Security Settings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Security</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
              <Switch id="twoFactorAuth" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
            </div>
            <Button className="mt-2">Update Security Settings</Button>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <Switch id="emailNotifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <Button className="mt-2">Update Notification Settings</Button>
          </div>
        </div>

        {/* Appearance Settings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Appearance</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode">Dark Mode</Label>
              <Switch id="darkMode" checked={darkMode} onCheckedChange={handleDarkModeToggle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}