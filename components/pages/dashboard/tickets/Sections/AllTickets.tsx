'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { TicketsProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllTickets = ({
  value,
  onTabChange,
  onEditIdChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
  onEditIdChange: (id: string | number | null) => void;
}) => {
  const t = useTranslations('Tickets.Dashboard');
  return (
    <GenericAllTable<TicketsProps>
      value={value}
      title={t('allTickets')}
      description={t('desc')}
      apiEndpoint="tickets"
      deleteEndpoint="ticket/delete"
      createTabValue="createTickets"
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
    />
  );
};

export default AllTickets;
