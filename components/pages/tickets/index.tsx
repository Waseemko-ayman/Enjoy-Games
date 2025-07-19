import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import PageHeader from '@/components/molecules/PageHeader';
import { PATHS } from '@/data/paths';
import React from 'react';

const TicketsPage = () => {
  return (
    <div>
      <PageHeader />
      <EmptyStateBox
        imageSrc="/assets/empty-tickets.png"
        alt="empty-status"
        title="لا يوجد تذاكر دعم فني حتى الآن..."
        buttonText="أضف تذكرة"
        btnlink={PATHS.TICKETS.CREATE.link}
      />
    </div>
  );
};

export default TicketsPage;
