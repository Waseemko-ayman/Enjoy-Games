/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { UsersTypes } from '@/data';
import { CreateUsersPorps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllUsers = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const t = useTranslations();

  const handleUsersFilter = (rows: any[], currentFilter: string) => {
    if (currentFilter === 'all') return rows;

    if (currentFilter === 'employees') {
      return rows.filter((item: any) => item.referral_code == null);
    }

    if (currentFilter === 'customers') {
      return rows.filter((item: any) => item.referral_code != null);
    }

    return rows;
  };

  return (
    <GenericAllTable<CreateUsersPorps>
      value={value}
      title={t('Dashboard.Users.title')}
      description={t('Dashboard.Users.manageUsers')}
      apiEndpoint="users"
      createTabValue="createUsers"
      deleteEndpoint="users/delete"
      placeholder={t('Inputs.placeHolders.searchUser')}
      onTabChange={onTabChange}
      showEdit={false}
      customFilter={handleUsersFilter}
      filterOptions={UsersTypes.map((item) => ({
        id: item.labelKey,
        label: t(`Dashboard.roles.${item.labelKey}`),
      }))}
      deleteLocation={t('sidebar.users')}
    />
  );
};

export default AllUsers;
