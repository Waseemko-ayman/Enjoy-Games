/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Button from '../atomic/Button';
import { FiClock } from 'react-icons/fi';
import useAPI from '@/hook/useAPI';
import { useTranslations } from 'next-intl';
import { FaX } from 'react-icons/fa6';

interface SessionInfo {
  user_id: number;
  has_session: boolean;
  is_expired: boolean;
  expires_at: string | null;
  timeout_minutes: number;
  message: string;
}

const FloatingSessionTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations('Dashboard.settings.sissionTimeout');
  const btnT = useTranslations('BtnTexts');

  const { get: getSession, data } = useAPI<SessionInfo, any>(
    'session-timeout/info'
  );
  const { add: extendSessionAPI, isLoading } = useAPI<any, any>(
    'session-timeout/extend'
  );

  // تحديث الوقت
  useEffect(() => {
    if (data?.expires_at) {
      const diff = new Date(data.expires_at).getTime() - Date.now();
      setTimeLeft(Math.max(Math.floor(diff / 1000), 0));

      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data]);

  const extendSession = async () => {
    try {
      const res = await extendSessionAPI({});
      if (res?.data?.expires_at) {
        const diff = new Date(res.data.expires_at).getTime() - Date.now();
        setTimeLeft(Math.max(Math.floor(diff / 1000), 0));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSession();
  }, [getSession]);

  // ألوان العداد
  const timerColor =
    timeLeft <= 10 ? 'text-red-600 font-bold' : 'text-gray-900 font-bold';
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const ClockButton = () => (
    <Button
      handleClick={() => setIsOpen(true)}
      otherClassName="fixed top-1/2 right-0 -translate-y-1/2 p-3 rounded-l-lg !rounded-r-none shadow-lg z-50"
    >
      <FiClock size={20} />
    </Button>
  );

  const CloseButton = () => (
    <Button
      variant="ghost"
      handleClick={() => setIsOpen(false)}
      otherClassName="ml-2"
    >
      <FaX size={16} />
    </Button>
  );

  const ExtendSessionButtonButton = () => (
    <Button
      otherClassName="px-5 py-2 text-sm shadow-sm hover:shadow-md"
      handleClick={extendSession}
      disabled={isLoading}
    >
      {isLoading ? btnT('extending_button') : btnT('extend_button')}
    </Button>
  );

  if (!data?.has_session || data?.is_expired) {
    return (
      <>
        {/* Desktop version */}
        <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl px-4 py-2 rounded-full border border-enjoy-primary z-50 text-sm font-medium">
          {data?.message || t('session_ended')}
        </div>

        {/* Mobile version */}
        <div className="md:hidden">
          {!isOpen && <ClockButton />}

          <div
            className={`fixed top-1/2 right-0 -translate-y-1/2 bg-white shadow-xl px-3 py-2 rounded-l-lg flex items-center gap-4 border border-gray-200 z-50 transform transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <p className="text-sm text-gray-600 font-medium">
              {data?.message || t('session_ended')}
            </p>
            <CloseButton />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop version */}
      <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl px-3 py-2 rounded-full items-center gap-4 border border-gray-200 z-50">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600 font-medium">
            {t('session_time_label')}:
          </p>
          <p className={`text-xl tabular-nums ${timerColor}`}>
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </p>
        </div>
        <div className="w-px h-6 bg-gray-300"></div>
        <ExtendSessionButtonButton />
      </div>

      {/* Mobile version */}
      <div className="md:hidden">
        {/* Clock Icon */}
        {!isOpen && <ClockButton />}

        {/* Retracted Panel */}
        <div
          className={`fixed top-1/2 right-0 -translate-y-1/2 bg-white shadow-xl px-3 py-2 rounded-l-lg flex items-center gap-4 border border-gray-200 z-50 transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600 font-medium">
              {t('session_time_label')}:
            </p>
            <p className={`text-xl tabular-nums ${timerColor}`}>
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </p>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
          <ExtendSessionButtonButton />

          <CloseButton />
        </div>
      </div>
    </>
  );
};

export default FloatingSessionTimer;
