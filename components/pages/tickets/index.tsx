/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import Loading from '@/components/molecules/loading';
import PageHeader from '@/components/molecules/PageHeader';
import { PATHS } from '@/data/paths';
import { useTranslations } from 'next-intl';
import Container from '@/components/organism/Container';
import Layer from '@/components/atomic/Layer';
import { useTickets } from '@/context/TicketsContext';
import { Ticket } from '@/interfaces';
import { AlertCircle, CheckCircle, Clock, MessageCircle } from 'lucide-react';
import ResponsiveDialogDrawer from '@/components/organism/ResponsiveDialogDrawer';
import TicketsCards from './Sections/TicketsCards';
import TicketDialogContent from './Sections/TicketDialogContent';
import useIsMobile from '@/hook/useIsMobile';

const TicketsPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const t = useTranslations('Tickets');
  const btnTexts = useTranslations('BtnTexts');

  // API Context (Hook)
  const { tickets, isLoading, error, markTicketsAsRead } = useTickets();
  const isMobile = useIsMobile();

  useEffect(() => {
    markTicketsAsRead();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'closed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'closed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorFetching />;

  return (
    <div>
      <PageHeader />
      <div>
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
                {tickets.map((ticket: Ticket, index: number) => (
                  <ResponsiveDialogDrawer
                    key={index}
                    trigger={
                      <TicketsCards
                        ticket={ticket}
                        t={t}
                        getStatusIcon={getStatusIcon}
                        getStatusColor={getStatusColor}
                        handleTicketClick={handleTicketClick}
                      />
                    }
                    open={selectedTicket?.id === ticket.id && open}
                    setOpen={(isOpen) => {
                      if (!isOpen) setSelectedTicket(null);
                      setOpen(isOpen);
                    }}
                    isMobile={isMobile}
                    contentClassName="!px-0 !max-w-2xl"
                  >
                    <TicketDialogContent
                      t={t}
                      selectedTicket={selectedTicket}
                      btnTexts={btnTexts}
                      getStatusIcon={getStatusIcon}
                      getStatusColor={getStatusColor}
                      setOpen={setOpen}
                    />
                  </ResponsiveDialogDrawer>
                ))}
              </div>
            </Container>
          </Layer>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
