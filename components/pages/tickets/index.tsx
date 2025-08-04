/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import Loading from '@/components/molecules/loading';
import PageHeader from '@/components/molecules/PageHeader';
import { PATHS } from '@/data/paths';
import useAPI from '@/hook/useAPI';
import { useTranslations } from 'next-intl';
import { TicketMessage } from '@/interfaces';
import Container from '@/components/organism/Container';
import Layer from '@/components/atomic/Layer';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
const CardWrapper = dynamic(() => import('@/components/atomic/CardWrapper'), {
  loading: () => <Loading />,
});

export interface TicketUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
export interface Ticket {
  id: number;
  user_id: number;
  assigned_to: number | null;
  subject: string;
  status: string;
  created_at: string;
  updated_at: string;
  latest_message: TicketMessage;
  user: TicketUser;
}

const TicketsPage = () => {
  const t = useTranslations('Tickets');
  const btnTexts = useTranslations('BtnTexts');

  const { get, data: tickets, isLoading, error } = useAPI<any>('tickets');

  useEffect(() => {
    get();
  }, []);

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
                  <AnimatedWrapper key={index} custom={index}>
                    <CardWrapper
                      key={ticket.id}
                      className="p-3 md:p-4 lg:p-5 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                          {ticket.subject}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            ticket.status === 'open'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {ticket.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm lg:text-base mb-2 line-clamp-2">
                        {ticket.latest_message.message}
                      </p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span className="text-xs lg:text-sm">
                          {t('by')}:{' '}
                          <span className="font-medium text-gray-800">
                            {ticket.user.name}
                          </span>
                        </span>
                        <span className="text-xs lg:text-sm">
                          {t('createdAt')}:{' '}
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardWrapper>
                  </AnimatedWrapper>
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
