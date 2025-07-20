import TicketsPage from '@/components/pages/tickets';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | تذاكر الدعم الفني',
};

const Tickets = () => <TicketsPage />;

export default Tickets;
