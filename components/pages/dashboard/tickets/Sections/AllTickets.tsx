'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { TicketsProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllTickets = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const t = useTranslations();
  return (
    <GenericAllTable<TicketsProps>
      value={value}
      title={t('Tickets.Dashboard.allTickets')}
      description={t('Tickets.Dashboard.desc')}
      apiEndpoint="tickets/admin/tickets"
      placeholder={t('Inputs.placeHolders.searchTicket')}
      onTabChange={onTabChange}
      showEdit={false}
    />
  );
};

export default AllTickets;
