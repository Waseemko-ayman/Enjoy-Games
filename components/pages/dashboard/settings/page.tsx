'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import PageTitle from '@/components/ui/common/PageTitle';
import TabsNavigation from '@/components/ui/display/TabsNavigation';
import GeneralSettings from './Sections/GeneralSettings';
import AccountSettings from './Sections/AccountSettings';
import { UserInfoProvider } from '@/context/UserInfoContext';
import SessionTimeoutSettings from './Sections/SessionTimeoutSettings';
import { useTranslations } from 'next-intl';
import { useToggleLocale } from '@/hook/useToggleLocale';

const SettingsPage = () => {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const t = useTranslations();
  const { isArabic } = useToggleLocale();

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
    { value: 'account', label: t('MyAccount.AccountInfo') },
    {
      value: 'session-timeout',
      label: t('Dashboard.settings.sissionTimeout.title'),
    },
    // { value: 'general', label: 'General' },
  ];

  return (
    <div className="space-y-6">
      <PageTitle
        title={t('sidebar.settings')}
        description={t('Dashboard.settings.pageDesc')}
      />
      <Tabs
        defaultValue="account"
        className={`w-full ${isArabic ? 'rtl' : 'ltr'}`}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <TabsNavigation tabs={tabsData} />
        <GeneralSettings
          saving={saving}
          success={success}
          handleSave={handleSave}
        />
        <UserInfoProvider>
          <AccountSettings />
        </UserInfoProvider>
        <SessionTimeoutSettings />
      </Tabs>
    </div>
  );
};

export default SettingsPage;
