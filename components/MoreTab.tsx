import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export function MoreTab() {
  const [language, setLanguage] = useState('English');
  const [privacyMode, setPrivacyMode] = useState(false);
  const [autoUpdates, setAutoUpdates] = useState(true);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">More Settings</h2>
      
      <div className="space-y-6">
        {/* Language Settings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Language</h3>
          <div className="mt-4 space-y-4">
            <Label htmlFor="language">Preferred Language</Label>
            <Select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
            </Select>
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Privacy</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="privacyMode">Enable Privacy Mode</Label>
              <Switch id="privacyMode" checked={privacyMode} onCheckedChange={setPrivacyMode} />
            </div>
          </div>
        </div>

        {/* Miscellaneous Settings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Miscellaneous</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoUpdates">Enable Auto Updates</Label>
              <Switch id="autoUpdates" checked={autoUpdates} onCheckedChange={setAutoUpdates} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}