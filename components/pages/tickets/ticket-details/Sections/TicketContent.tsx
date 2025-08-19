/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Button from '@/components/atomic/Button';
import CardWrapper from '@/components/atomic/CardWrapper';
import Input from '@/components/atomic/Input';
import Layer from '@/components/atomic/Layer';
import TicketMetaItem from '@/components/atomic/TicketMetaItem';
import Container from '@/components/organism/Container';
import { CardContent, CardHeader } from '@/components/ui/card';
import useAPI from '@/hook/useAPI';
import { TicketMetaItemProps, TranslationFunction } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Calendar,
  Clock,
  FileText,
  MessageCircle,
  Paperclip,
  Reply,
  Send,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';
import { FaX } from 'react-icons/fa6';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useToast } from '@/lib/toast';

type FormValues = {
  message: string;
  [key: string]: unknown;
};

const TicketContent = ({
  ticket,
  t,
  btnTexts,
  getStatusIcon,
  getStatusColor,
}: {
  ticket: any;
  t: TranslationFunction;
  btnTexts: TranslationFunction;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
}) => {
  const [attachments, setAttachments] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputT = useTranslations('Inputs.placeHolders');
  const { showToast } = useToast();

  const metaData: TicketMetaItemProps[] = [
    { Icon: User, label: t('by'), value: ticket?.user.name },
    {
      Icon: Calendar,
      label: t('createdAt'),
      value: new Date(ticket?.created_at).toLocaleDateString(),
    },
    {
      Icon: Clock,
      label: t('lastUpdated'),
      value: new Date(ticket?.updated_at).toLocaleDateString(),
    },
  ];

  const schema = yup.object().shape({
    message: yup.string().required('الرسالة مطلوبة'),
  });

  const { add, isLoading } = useAPI(`tickets/${ticket.id}/reply`);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { message: '' },
    mode: 'onSubmit',
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('message', data.message);

      attachments.forEach((file) => formData.append('attachments[]', file));

      const response = await add(formData);
      reset();
      setAttachments([]);
      showToast(response?.message);
    } catch (error) {
      const apiError = (error as any)?.response?.message;
      showToast(apiError, 'error');
      console.error('Failed to send reply:', error);
    }
  };

  return (
    <Layer>
      <Container>
        <CardWrapper className="min-h-[90vh]">
          <div className="px-4 py-2">
            {/* Card Header */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {ticket?.subject}
              </h2>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full border flex items-center gap-2 ${getStatusColor(
                  ticket?.status
                )}`}
              >
                {getStatusIcon(ticket?.status)}
                {ticket?.status.toUpperCase()}
              </span>
            </CardHeader>

            {/* Meta Data */}
            <CardContent className="flex-1 overflow-y-auto p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {metaData.map((item, index) => (
                    <TicketMetaItem
                      key={index}
                      Icon={item.Icon}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </div>
              </div>

              {/* Conversation */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {t('conversation')}
                </h3>

                {/* Latest message */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {ticket?.user.name}
                        </p>
                        <p className="text-sm text-gray-500">{t('customer')}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(ticket?.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {ticket?.latest_message.message}
                  </p>
                </div>

                {/* Messages */}
                {ticket?.messages?.map((message: any, index: number) => {
                  const isAdmin = message.is_admin_reply;
                  const bgColor = isAdmin
                    ? 'bg-green-50 border-green-400'
                    : 'bg-blue-50 border-blue-400';
                  const IconComp = isAdmin ? Reply : User;
                  const name = isAdmin
                    ? message.admin_name || t('supportTeam')
                    : ticket?.user.name;
                  const role = isAdmin ? t('supportAgent') : t('customer');

                  return (
                    <div
                      key={index}
                      className={`border-l-4 p-4 rounded-r-lg ${bgColor}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500">
                            <IconComp className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{name}</p>
                            <p className="text-sm text-gray-500">{role}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(message.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {message.message}
                      </p>
                      {message.attachments?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.attachments.map((att: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1 bg-white px-2 py-1 rounded text-sm"
                            >
                              <FileText className="w-3 h-3" />
                              <span>{att.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>

            {/* Reply Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="border-t border-gray-200 bg-white">
                <div className="p-4 space-y-3">
                  {/* Attachments preview */}
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {attachments.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg text-sm"
                        >
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-700">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(idx)}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <FaX className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message input */}
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <Input
                        inputName="message"
                        type="textarea"
                        {...field}
                        placeholder={
                          inputT('typeYourReply') || 'Type your reply...'
                        }
                        otherClassNameContainer={`w-full !rounded-xl p-4 ${
                          errors.message ? 'border border-red-500' : ''
                        }`}
                      />
                    )}
                  />
                  {errors.message && (
                    <p className="text-red-500">{errors.message.message}</p>
                  )}

                  {/* Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Button
                        variant="ghost"
                        handleClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                      >
                        <Paperclip className="w-4 h-4 mr-2" />
                        {t('addAttachments') || 'Attach Files'}
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      otherClassName="px-6 py-2"
                    >
                      {isLoading ? (
                        btnTexts('sending') || 'Sending...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {btnTexts('reply') || 'Reply'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="text-sm text-muted-foreground border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl">
            {t('ticketId')}: #{ticket?.id}
          </div>
        </CardWrapper>
      </Container>
    </Layer>
  );
};

export default TicketContent;
