import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import { useTranslations } from 'next-intl';
import AllCustomers from './Sections/AllCustomers';
import CreateCustomers from './Sections/CreateCustomers';

const CustomersPage = () => {
  const t = useTranslations('Dashboard.Users');

  const tabsData = [
    { value: 'allCustomer', label: t('CustomerTitle') },
    {
      value: 'createCustomers',
      label: t('createCustomers'),
    },
  ];

  return (
    <GenericPage
      title={t('CustomerTitle')}
      description={t('CustomerDesc')}
      tabs={tabsData}
      allComponent={AllCustomers}
      createComponent={CreateCustomers}
    />
  );
};

export default CustomersPage;
