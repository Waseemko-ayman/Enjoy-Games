import Loading from '@/components/molecules/loading';
import { Ticket, TranslationFunction } from '@/interfaces';
import { Calendar, ChevronRight, User } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';
const CardWrapper = dynamic(() => import('@/components/atomic/CardWrapper'), {
  loading: () => <Loading />,
});

const TicketsCards = ({
  ticket,
  t,
  getStatusIcon,
  getStatusColor,
  handleTicketClick,
}: {
  ticket: Ticket;
  t: TranslationFunction;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
  handleTicketClick: (id: number) => void;
}) => {
  return (
    // <AnimatedWrapper custom={index}>
    <CardWrapper
      key={ticket.id}
      className="p-4 md:p-5 lg:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300"
      onClick={() => handleTicketClick(ticket.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 line-clamp-2 flex-1">
          {ticket.subject}
        </h3>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full border flex items-center gap-1 ${getStatusColor(
            ticket.status
          )}`}
        >
          {getStatusIcon(ticket.status)}
          {ticket.status.toUpperCase()}
        </span>
      </div>

      <p className="text-gray-700 text-sm lg:text-base mb-4 line-clamp-3">
        {ticket.latest_message.message}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <User className="w-4 h-4" />
          <span className="font-medium">{ticket.user.name}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {t('lastUpdated')}: {new Date(ticket.updated_at).toLocaleDateString()}
        </span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </CardWrapper>
    // </AnimatedWrapper>
  );
};

export default TicketsCards;
