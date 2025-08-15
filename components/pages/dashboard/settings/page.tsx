'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import PageTitle from '@/components/ui/common/PageTitle';
import TabsNavigation from '@/components/ui/display/TabsNavigation';
import GeneralSettings from './Sections/GeneralSettings';
import AccountSettings from './Sections/AccountSettings';
import SecuritySettings from './Sections/SecuritySettings';

const SettingsPage = () => {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  const tabsData = [
    // { value: 'general', label: 'General' },
    { value: 'account', label: 'Account' },
    { value: 'security', label: 'Security' },
  ];

  return (
    <div className="space-y-6">
      <PageTitle
        title="Settings"
        description="Manage your account settings and preferences"
      />
      <Tabs defaultValue="account" className="w-full">
        <TabsNavigation tabs={tabsData} />
        <GeneralSettings
          saving={saving}
          success={success}
          handleSave={handleSave}
        />
        <AccountSettings
          saving={saving}
          success={success}
          handleSave={handleSave}
        />
        <SecuritySettings
          saving={saving}
          success={success}
          handleSave={handleSave}
        />
      </Tabs>
    </div>
  );
};

export default SettingsPage;
