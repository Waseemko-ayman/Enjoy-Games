'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { CreateUsersPorps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllEmployees = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const t = useTranslations();

  return (
    <GenericAllTable<CreateUsersPorps>
      value={value}
      title={t('Dashboard.Users.EmployeeTitle')}
      description={t('Dashboard.Users.manageEmployees')}
      apiEndpoint="employees"
      createTabValue="createEmployees"
      deleteEndpoint="employees/delete"
      placeholder={t('Inputs.placeHolders.searchEmployee')}
      onTabChange={onTabChange}
      showEdit={false}
      deleteLocation={t('sidebar.employees')}
    />
  );
};

export default AllEmployees;
