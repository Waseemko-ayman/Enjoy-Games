import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllTickets from './Sections/AllTickets';
import CreateTickets from './Sections/CreateTickets';

const tabsData = [
  { value: 'allTickets', label: 'جميع التذاكر' },
  { value: 'createTickets', label: 'إنشاء تذكرة' },
];

const TicketsPage = () => {
  return (
    <GenericPage
      title="جميع التذاكر"
      description="قم بإنشاء وإدارة التذاكر لمتجرك"
      tabs={tabsData}
      allComponent={AllTickets}
      createComponent={CreateTickets}
    />
  );
};

export default TicketsPage;
