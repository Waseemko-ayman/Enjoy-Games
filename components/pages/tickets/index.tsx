import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import PageHeader from '@/components/molecules/PageHeader';
import { PATHS } from '@/data/paths';
import { useTranslations } from 'next-intl';
import React from 'react';

const TicketsPage = () => {
  const t = useTranslations('Tickets');
  const btnTexts = useTranslations('BtnTexts');
  return (
    <div>
      <PageHeader />
      <EmptyStateBox
        imageSrc="/assets/empty-tickets.png"
        alt="empty-status"
        title={t('emptyStateTitle')}
        buttonText={btnTexts('AddTicket')}
        btnlink={PATHS.TICKETS.CREATE.link}
      />
    </div>
  );
};

export default TicketsPage;
