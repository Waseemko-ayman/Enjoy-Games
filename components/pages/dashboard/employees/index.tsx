import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import { useTranslations } from 'next-intl';
import AllEmployees from './Sections/AllEmployees';
import CreateEmployees from './Sections/CreateEmployees';

const EmployeesPage = () => {
  const t = useTranslations('Dashboard.Users');

  const tabsData = [
    { value: 'allEmployee', label: t('EmployeeTitle') },
    {
      value: 'createEmployees',
      label: t('createEmployees'),
    },
  ];

  return (
    <GenericPage
      title={t('EmployeeTitle')}
      description={t('EmployeeDesc')}
      tabs={tabsData}
      allComponent={AllEmployees}
      createComponent={CreateEmployees}
    />
  );
};

export default EmployeesPage;
