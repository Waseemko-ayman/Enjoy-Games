/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import TicketContent from './Sections/TicketContent';
import { Bell, CheckCircle, Clock, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Loading from '@/components/molecules/loading';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import PageHeader from '@/components/molecules/PageHeader';
import useAPI from '@/hook/useAPI';
import { useSearchParams } from 'next/navigation';
import { useTickets } from '@/context/TicketsContext';

const TicketDetailsPage = ({ id }: { id: string }) => {
  const t = useTranslations('Tickets');
  const btnTexts = useTranslations('BtnTexts');

  const { getSingle: readSingleNotification } = useAPI('notifications');

  const { getSingle: getTicket, isLoading, error } = useTickets();
  const [ticket, setTicket] = useState<any>(null);

  const searchParams = useSearchParams();
  const ticketId = id || searchParams.get('id');

  const getStatusIcon = (status?: string) => {
    if (!status) return <MessageCircle className="w-4 h-4" />;
    switch (status.toLowerCase()) {
      case 'open':
        return <Bell className="w-4 h-4" />;
      case 'closed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-800 border-gray-200';
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
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

  useEffect(() => {
    if (!ticketId || !ticket) return;
    const markAsRead = async () => {
      try {
        await readSingleNotification(`${ticketId}/read`);
      } catch (err) {
        console.error('Failed to mark notification as read', err);
      }
    };
    markAsRead();
  }, [ticketId]);

  useEffect(() => {
    if (!ticketId) return;

    const fetchTicket = async () => {
      try {
        const res = await getTicket(ticketId);
        setTicket(res?.data);
      } catch (err: any) {
        console.error(err);
      } finally {
      }
    };

    fetchTicket();
  }, [ticketId]);

  return (
    <div>
      <PageHeader />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorFetching />
      ) : !ticket ? (
        <Loading />
      ) : (
        <TicketContent
          t={t}
          ticket={ticket}
          btnTexts={btnTexts}
          getStatusIcon={getStatusIcon}
          getStatusColor={getStatusColor}
        />
      )}
    </div>
  );
};

export default TicketDetailsPage;
