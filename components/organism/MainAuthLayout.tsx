'use client';
import React, { ReactNode } from 'react';
import BackgroundCircles from '../molecules/BackgroundCircles';
import Link from 'next/link';
import { PATHS } from '@/data/paths';
import { FaX } from 'react-icons/fa6';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';

const MainAuthLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const pathWithoutLocale = pathname.split('/').slice(2).join('/');
  const isSignupPage = pathWithoutLocale === 'signup';

  const { toggleLocale, isArabic } = useToggleLocale();
  const t = useTranslations('Languages');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white relative overflow-hidden">
      {/* Background Circles */}
      <BackgroundCircles />

      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-6">
          <h2
            className="text-enjoy-primary text-sm font-bold cursor-pointer"
            onClick={toggleLocale}
          >
            {isArabic ? t('english') : t('arabic')}
          </h2>
          <Link
            href={isSignupPage ? PATHS.LOGIN : PATHS.HOME.link}
            className="text-gray-400 bg-white hover:text-white hover:bg-enjoy-primary border border-[var(--enjoy-gray-400)] hover:border-[var(--enjoy-primary)] w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          >
            {isSignupPage ? (
              <IoIosArrowBack className="w-3 h-3" />
            ) : (
              <FaX className="w-3 h-3" />
            )}
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default MainAuthLayout;
