import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllTickets from './Sections/AllTickets';
import CreateTickets from './Sections/CreateTickets';
import { useTranslations } from 'next-intl';

const TicketsPage = () => {
  const t = useTranslations();

  const tabsData = [
    { value: 'allTickets', label: t('Tickets.Dashboard.allTickets') },
    { value: 'createTickets', label: t('Tickets.Dashboard.createTicket') },
  ];
  return (
    <GenericPage
      title={t('PagesHeaderTitles.tickets')}
      description={t('Tickets.Dashboard.PageDesc.desc')}
      tabs={tabsData}
      allComponent={AllTickets}
      createComponent={CreateTickets}
    />
  );
};

export default TicketsPage;
