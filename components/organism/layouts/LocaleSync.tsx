'use client';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { setAxiosLocale } from '@/utils/axiosInstance';

export default function LocaleSync() {
  const locale = useLocale();

  useEffect(() => {
    setAxiosLocale(locale);
  }, [locale]);

  return null;
}
