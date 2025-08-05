import Button from '@/components/atomic/Button';
import TicketMetaItem from '@/components/atomic/TicketMetaItem';
import { Ticket, TicketMetaItemProps, TranslationFunction } from '@/interfaces';
import { Calendar, Clock, MessageCircle, User } from 'lucide-react';
import React from 'react';
import { FaX } from 'react-icons/fa6';

const TicketDialogContent = ({
  selectedTicket,
  t,
  // btnTexts,
  getStatusIcon,
  getStatusColor,
  setOpen,
}: {
  selectedTicket: Ticket | null;
  t: TranslationFunction;
  btnTexts: TranslationFunction;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!selectedTicket) return null;

  const metaData: TicketMetaItemProps[] = [
    {
      Icon: User,
      label: t('by'),
      value: selectedTicket.user.name,
    },
    {
      Icon: Calendar,
      label: t('createdAt'),
      value: new Date(selectedTicket.created_at).toLocaleDateString(),
    },
    {
      Icon: Clock,
      label: t('lastUpdated'),
      value: new Date(selectedTicket.updated_at).toLocaleDateString(),
    },
  ];

  return (
    <div>
      {selectedTicket && (
        <div className="max-h-[90vh]">
          <div className="flex items-center justify-between pb-6 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedTicket.subject}
              </h2>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full border flex items-center gap-2 
                ${getStatusColor(selectedTicket.status)}`}
              >
                {getStatusIcon(selectedTicket.status)}
                {selectedTicket.status.toUpperCase()}
              </span>
            </div>
            <Button
              variant="ghost"
              handleClick={() => setOpen(false)}
              Icon={FaX}
              otherClassName="text-enjoy-primary-deep p-2 hover:bg-gray-100"
            />
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {metaData.map((item: TicketMetaItemProps, index) => (
                  <TicketMetaItem
                    key={index}
                    Icon={item.Icon}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {t('conversation')}
              </h3>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedTicket.user.name}
                      </p>
                      <p className="text-sm text-gray-500">{t('customer')}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(selectedTicket.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">
                  {selectedTicket.latest_message.message}
                </p>
              </div>

              {/* {selectedTicket.messages &&
                selectedTicket.messages
                  .filter((msg) => msg.is_admin_reply)
                  .map((message, index) => (
                    <div
                      key={index}
                      className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Reply className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {message.admin_name || t('supportTeam')}
                            </p>
                            <p className="text-sm text-gray-500">
                              {t('supportAgent')}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(message.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>
                  ))}

              {selectedTicket.messages &&
                selectedTicket.messages
                  .filter(
                    (msg) =>
                      !msg.is_admin_reply &&
                      msg.id !== selectedTicket.latest_message.id
                  )
                  .map((message, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {selectedTicket.user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {t('customer')}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(message.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>
                  ))} */}
            </div>
          </div>
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {t('ticketId')}: #{selectedTicket.id}
              </div>
              {/* <div className="flex space-x-3">
                <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  {btnTexts('close')}
                </button>
                <Button Icon={Reply} otherClassName="px-4 py-2">
                  {btnTexts('reply')}
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDialogContent;
