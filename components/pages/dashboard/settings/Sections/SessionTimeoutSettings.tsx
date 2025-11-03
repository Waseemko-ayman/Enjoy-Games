/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import FormError from '@/components/atomic/FormError';
import { Button } from '@/components/ui/button';
import CardDescription, { CardTitle } from '@/components/ui/card';
import SettingsTab from '@/components/ui/display/SettingsTab';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/atomic/Input';
import { Clock, Globe, Server } from 'lucide-react';
import { useToast } from '@/lib/toast';
import useAPI from '@/hook/useAPI';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import SiteCard from '@/components/molecules/SiteCard';
import TimeoutCard from '@/components/molecules/TimeoutCard';

interface FormValues {
  demo_minutes?: number | null | undefined;
  live_minutes?: number | null | undefined;
}

const inputFields = [
  {
    id: 'demo_minutes',
    name: 'demo_minutes',
    label: 'DemoMinutes',
  },
  {
    id: 'live_minutes',
    name: 'live_minutes',
    label: 'LiveMinutes',
  },
];

const SessionTimeoutSettings = () => {
  // Translations
  const t = useTranslations('Dashboard.settings.sissionTimeout');
  const btnT = useTranslations('BtnTexts');

  const schema = yup.object().shape({
    demo_minutes: yup
      .number()
      .nullable()
      .notRequired()
      .min(30, t('MinTimeoutError')),
    live_minutes: yup
      .number()
      .nullable()
      .notRequired()
      .min(30, t('MinTimeoutError')),
  });

  // Notifications
  const { showToast } = useToast();

  // API Hooks
  const { get, data: settings } = useAPI('session-timeout/settings');
  const { add, isLoading } = useAPI('session-timeout/update');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      demo_minutes: 0,
      live_minutes: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const payloads = [];
    if (data.demo_minutes) {
      payloads.push({
        site_status: 'demo',
        timeout_minutes: data.demo_minutes,
      });
    }
    if (data.live_minutes) {
      payloads.push({
        site_status: 'live',
        timeout_minutes: data.live_minutes,
      });
    }
    try {
      let response;
      for (const payload of payloads) {
        response = await add(payload);
      }
      showToast(response?.message || 'تم التحديث بنجاح');
    } catch (error: any) {
      showToast(error?.response?.message, 'error');
    }
  };

  useEffect(() => {
    if (settings) {
      reset({
        demo_minutes: settings?.settings?.demo?.timeout_minutes || 0,
        live_minutes: settings?.settings?.live?.timeout_minutes || 0,
      });
    }
  }, [settings, reset]);

  useEffect(() => {
    get();
  }, [get]);

  const isLive = settings?.current_status === 'live';

  const cards = [
    {
      key: 'DemoSite',
      icon: Server,
      gradient: 'from-amber-500 to-orange-500',
      settings: settings?.settings?.demo,
    },
    {
      key: 'LiveSite',
      icon: Globe,
      gradient: 'from-emerald-500 to-teal-500',
      settings: settings?.settings?.live,
    },
  ];

  const timeoutData = [
    {
      label: t('TimeoutDuration'),
      value: settings?.current_timeout_minutes ?? 0,
      unit: t('Minutes'),
      icon: <Clock className="w-5 h-5 text-slate-500" />,
    },
    {
      label: t('InHours'),
      value: settings?.current_timeout_hours ?? 0,
      unit: t('Hours'),
      icon: <Clock className="w-5 h-5 text-slate-500" />,
    },
  ];

  return (
    <SettingsTab
      value="session-timeout"
      title={t('title')}
      description={t('desc')}
    >
      {/* Current Status Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {t('CurrentStatus')}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isLive
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {isLive ? t('Live') : t('Demo')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {timeoutData.map((item) => (
            <TimeoutCard
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
              unit={item.unit}
            />
          ))}
        </div>
      </div>

      {/* Configuration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((card: any) => (
          <SiteCard
            key={card.key}
            icon={card.icon}
            gradient={card.gradient}
            titleKey={t(card.key)}
            settings={card.settings}
            t={t}
          />
        ))}
      </div>

      {/* Info Footer */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <span className="font-medium">{t('Note')}:</span> {t('NoteMessage')}
        </p>
      </div>

      <div className="w-full h-0.5 bg-gray-100 my-6" />

      {/* Update Session Timeout */}
      <div>
        <div>
          <CardTitle className="mb-2">{t('UpdateSessionTimeout')}</CardTitle>
          <CardDescription>{t('UpdateDesc')}</CardDescription>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.map((field) => {
              const label = t(field.label);
              return (
                <div key={field.id}>
                  <Input
                    id={field.id}
                    type="number"
                    variant="secondary"
                    label={label}
                    inputName={field.name}
                    min={0}
                    {...register(field.name as keyof FormValues)}
                    className={`w-full ${
                      errors[field.name as keyof FormValues]
                        ? 'border-red-500'
                        : ''
                    }`}
                    otherClassNameContainer="py-2"
                  />
                  {errors[field.name as keyof FormValues] && (
                    <FormError
                      message={
                        errors[field.name as keyof FormValues]
                          ?.message as string
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <Button type="submit">
              {isLoading ? (
                <>
                  {btnT('Saving')}
                  <ButtonLoading />
                </>
              ) : (
                btnT('SaveChanges')
              )}
            </Button>
          </div>
        </form>
      </div>
    </SettingsTab>
  );
};

export default SessionTimeoutSettings;
