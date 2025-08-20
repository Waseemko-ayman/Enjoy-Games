'use client';
import React from 'react';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import Loading from '@/components/molecules/loading';
import PageHeader from '@/components/molecules/PageHeader';
import { PATHS } from '@/data/paths';
import { useTranslations } from 'next-intl';
import Container from '@/components/organism/Container';
import Layer from '@/components/atomic/Layer';
import { TicketsProvider, useTickets } from '@/context/TicketsContext';
import { Ticket } from '@/interfaces';
import TicketsCards from './Sections/TicketsCards';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import Button from '@/components/atomic/Button';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/molecules/Pagination';
import { usePagination } from '@/hook/usePagination';
import {
  getTicketStatusColor,
  getTicketStatusIcon,
} from '@/utils/statusHelpers';

const TicketsPage = () => {
  const t = useTranslations('Tickets');
  const btnTexts = useTranslations('BtnTexts');

  // API Context (Hook)
  const { tickets, isLoading, error } = useTickets();
  const router = useRouter();

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    totalItems,
    itemsPerPage,
  } = usePagination<Ticket>({ data: tickets || [], itemsPerPage: 9 });

  if (isLoading) return <Loading />;
  if (error) return <ErrorFetching />;

  return (
    <div>
      <PageHeader />
      <TicketsProvider>
        {!tickets || tickets.length === 0 ? (
          <EmptyStateBox
            imageSrc="/assets/empty-tickets.png"
            alt="empty-status"
            title={t('emptyStateTitle')}
            buttonText={btnTexts('AddTicket')}
            btnlink={PATHS.TICKETS.CREATE.link}
          />
        ) : (
          <Layer otherClassName="!my-12">
            <Container>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {paginatedData.map((ticket: Ticket, index: number) => (
                  <TicketsCards
                    key={index}
                    ticket={ticket}
                    t={t}
                    getStatusIcon={getTicketStatusIcon}
                    getStatusColor={getTicketStatusColor}
                    handleTicketClick={(id) =>
                      router.push(PATHS.TICKETS.ITEM(id).link)
                    }
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                className="mt-6"
              />
              <MotionSection index={2}>
                <Button
                  href={PATHS.TICKETS.CREATE.link}
                  otherClassName="py-3 mt-5 w-[150px]"
                >
                  {btnTexts('AddTicket')}
                </Button>
              </MotionSection>
            </Container>
          </Layer>
        )}
      </TicketsProvider>
    </div>
  );
};

export default TicketsPage;
