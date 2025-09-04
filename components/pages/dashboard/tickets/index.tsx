import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllTickets from './Sections/AllTickets';
import { useTranslations } from 'next-intl';

const TicketsPage = () => {
  const t = useTranslations();

  const tabsData = [
    { value: 'allTickets', label: t('Tickets.Dashboard.allTickets') },
  ];

  return (
    <GenericPage
      title={t('PagesHeaderTitles.tickets')}
      description={t('Tickets.Dashboard.PageDesc.desc')}
      tabs={tabsData}
      allComponent={AllTickets}
    />
  );
};

export default TicketsPage;
