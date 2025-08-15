'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { TicketsProps } from '@/interfaces';
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
  return (
    <GenericAllTable<TicketsProps>
      value={value}
      title="جميع التذاكر"
      description="إدارة جميع التذاكر في مكان واحد"
      apiEndpoint="tickets"
      deleteEndpoint="ticket/delete"
      createTabValue="createTickets"
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
    />
  );
};

export default AllTickets;
