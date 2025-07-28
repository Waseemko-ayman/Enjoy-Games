'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

const LocaleSync = () => {
  const locale = useLocale();

  useEffect(() => {
    localStorage.setItem('NEXT_LOCALE', locale);
  }, [locale]);

  return null;
};

export default LocaleSync;
