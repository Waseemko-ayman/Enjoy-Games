'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
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

  return (
    <GenericAllTable<CreateUsersPorps>
      value={value}
      title={t('Dashboard.Users.title')}
      description={t('Dashboard.Users.manageUsers')}
      apiEndpoint="users"
      createTabValue="createUsers"
      deleteEndpoint="user/delete"
      placeholder={t('Inputs.placeHolders.searchUser')}
      onTabChange={onTabChange}
      showEdit={false}
    />
  );
};

export default AllUsers;
