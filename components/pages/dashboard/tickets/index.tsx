import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllTickets from './Sections/AllTickets';
import CreateTickets from './Sections/CreateTickets';
import { useTranslations } from 'next-intl';

const tabsData = [
  { value: 'allTickets', label: 'جميع التذاكر' },
  { value: 'createTickets', label: 'إنشاء تذكرة' },
];

const TicketsPage = () => {
  const t = useTranslations();
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
