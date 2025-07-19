import dynamic from 'next/dynamic';
import React from 'react';

const TicketsPage = dynamic(() => import('@/components/pages/tickets'), {
  ssr: false,
});

const Tickets = () => <TicketsPage />;

export default Tickets;
