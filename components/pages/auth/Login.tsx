'use client';

import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), {
  ssr: false,
});

import CardWrapper from '@/components/atomic/CardWrapper';
import Container from '@/components/organism/Container';
import { PATHS } from '@/data/paths';
import { FaX } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atomic/Button';
import BackgroundCircles from '@/components/molecules/BackgroundCircles';

const LoginPage = () => {
  const [phone, setPhone] = useState<string | undefined>(undefined);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #e8d5ff 0%, #f3e8ff 50%, #ddd6fe 100%)',
      }}
      dir="ltr"
    >
      {/* background circles */}
      <BackgroundCircles />

      <div className="relative z-10 min-h-screen">
        <Container otherClassName="flex items-center justify-center min-h-screen">
          <CardWrapper className="p-6 w-full max-w-lg mx-auto !rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <Link href="#" className="text-enjoy-primary text-sm font-bold">
                English
              </Link>
              <Link
                href={PATHS.HOME.link}
                className="text-gray-400 hover:text-enjoy-primary hover:border-[var(--enjoy-primary)] border border-[var(--enjoy-gray-400)] w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <FaX className="w-3 h-3" />
              </Link>
            </div>

            <Image
              src="/assets/logo.png"
              alt="Enjoy Games"
              title="Enjoy Games"
              width={150}
              height={150}
              className="mx-auto pb-5"
            />

            <div className="text-center mb-9">
              <h1 className="text-xl font-bold">أيش رقم جوالك؟</h1>
              <p className="text-base font-normal mt-2.5">
                أنشئ حسابًا أو سجّل دخولك بحسابك المسجّل في إنجوي قيمز
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-right text-gray-700 font-normal text-sm mb-2">
                رقم الجوال
              </label>
              <PhoneInput
                international
                defaultCountry="PS"
                value={phone}
                onChange={setPhone}
                placeholder="xxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <Button otherClassName="w-full py-3 px-6">التالي</Button>
          </CardWrapper>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
