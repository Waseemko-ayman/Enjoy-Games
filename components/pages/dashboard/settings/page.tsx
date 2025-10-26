'use client';

import { Tabs } from '@/components/ui/tabs';
import PageTitle from '@/components/ui/common/PageTitle';
import TabsNavigation from '@/components/ui/display/TabsNavigation';
import AccountSettings from './Sections/AccountSettings';
import { UserInfoProvider } from '@/context/UserInfoContext';
import SessionTimeoutSettings from './Sections/SessionTimeoutSettings';
import { useTranslations } from 'next-intl';
import { useToggleLocale } from '@/hook/useToggleLocale';

const SettingsPage = () => {
  const t = useTranslations();
  const { isArabic } = useToggleLocale();

  const tabsData = [
    { value: 'account', label: t('MyAccount.AccountInfo') },
    {
      value: 'session-timeout',
      label: t('Dashboard.settings.sissionTimeout.title'),
    },
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
        <UserInfoProvider>
          <AccountSettings />
        </UserInfoProvider>
        <SessionTimeoutSettings />
      </Tabs>
    </div>
  );
};

export default SettingsPage;
