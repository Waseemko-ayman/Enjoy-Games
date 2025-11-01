'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { CreateCustomersPorps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllCustomers = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const t = useTranslations();

  return (
    <GenericAllTable<CreateCustomersPorps>
      value={value}
      title={t('Dashboard.Users.CustomerTitle')}
      description={t('Dashboard.Users.manageCustomers')}
      apiEndpoint="users"
      createTabValue="createCustomers"
      deleteEndpoint="users/delete"
      placeholder={t('Inputs.placeHolders.searchCustomer')}
      onTabChange={onTabChange}
      showEdit={false}
      deleteLocation={t('sidebar.customers')}
    />
  );
};

export default AllCustomers;
