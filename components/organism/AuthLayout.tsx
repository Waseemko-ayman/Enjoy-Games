'use client';

import React from 'react';
import { FaX } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { PATHS } from '@/data/paths';
import Button from '../atomic/Button';
import { usePathname } from 'next/navigation';
import { AuthLayoutProps } from '@/interfaces';
import BackgroundCircles from '../molecules/BackgroundCircles';

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  btnText,
  title,
  description,
  showFooterText,
  isSubmitDisabled,
  onSubmit,
}) => {
  const pathname = usePathname();
  const isOTPPage = pathname.includes('otp');

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white relative overflow-hidden"
      dir="ltr"
    >
      {/* Background Circles */}
      <BackgroundCircles />

      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <h2 className="text-enjoy-primary text-sm font-bold cursor-pointer">
            English
          </h2>
          <Link
            href={PATHS.HOME.link}
            className="text-gray-400 bg-white hover:text-white hover:bg-enjoy-primary border border-[var(--enjoy-gray-400)] hover:border-[var(--enjoy-primary)] w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          >
            <FaX className="w-3 h-3" />
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center px-8 pt-8 pb-12 max-w-lg mx-auto">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="pb-3"
          />

          {/* Title & Description */}
          <div className="mb-5 text-center">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-base font-normal mt-2.5">{description}</p>
          </div>

          {/* Change Number Link */}
          {isOTPPage && (
            <Link
              href={PATHS.LOGIN}
              className="text-enjoy-primary font-semibold text-sm mb-10 hover:text-enjoy-primary-soft transition-colors duration-300"
            >
              تغيير رقم الجوال
            </Link>
          )}

          {/* Children Content */}
          <div className="w-full  mb-6">{children}</div>

          {/* Submit Button */}
          <Button
            type="submit"
            handleClick={onSubmit}
            disabled={isSubmitDisabled}
            otherClassName="w-full py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {btnText}
          </Button>

          {/* Footer */}
          {showFooterText && (
            <p className="text-xs text-[var(--enjoy-gray-650)] font-normal text-center  leading-relaxed mt-4">
              بإنشاء حساب جديد؛ أنت توافق ضمنيًا على{' '}
              <Link
                href={PATHS.PRIVACY_POLICY.link}
                className="text-enjoy-primary font-semibold hover:text-enjoy-primary-soft transition-colors duration-300"
              >
                سياسة الخصوصية
              </Link>{' '}
              و{' '}
              <Link
                href="#"
                className="text-enjoy-primary font-semibold hover:text-enjoy-primary-soft transition-colors duration-300"
              >
                الشروط والأحكام
              </Link>{' '}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
