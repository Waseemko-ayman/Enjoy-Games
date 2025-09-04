import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllUsers from './Sections/AllUsers';
import { useTranslations } from 'next-intl';
import CreateUsers from './Sections/CreateUsers';

const UsersPage = () => {
  const t = useTranslations('Dashboard.Users');

  const tabsData = [
    { value: 'allUsers', label: t('title') },
    {
      value: 'createUsers',
      label: t('createUsers'),
    },
  ];

  return (
    <GenericPage
      title={t('title')}
      description={t('desc')}
      tabs={tabsData}
      allComponent={AllUsers}
      createComponent={CreateUsers}
    />
  );
};

export default UsersPage;
