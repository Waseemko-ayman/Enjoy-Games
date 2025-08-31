'use client';
import Avatar from '@/components/atomic/Avatar';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import CardWrapper from '@/components/atomic/CardWrapper';
import InlineError from '@/components/molecules/InlineError';
import { API_IMAGE_URL } from '@/config/api';
import { useUserInfo } from '@/context/UserInfoContext';
import { useWallet } from '@/context/WalletContext';
import { PATHS } from '@/data/paths';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState } from 'react';
import { PiSparkleFill } from 'react-icons/pi';

const Information = () => {
  const [accountAdvance] = useState(20);
  const infoStyle = 'flex items-center gap-2 text-sm font-semibold';
  const t = useTranslations('Layout.header.account');
  const titleTxts = useTranslations('PagesHeaderTitles');
  const { isArabic } = useToggleLocale();

  const { myWallet, isLoading, error } = useWallet();
  const { user, isLoading: infoLoading, error: infoError } = useUserInfo();

  return (
    <CardWrapper
      bgColor="bg-white"
      className="py-3 px-5 shadow-[0_8.293px_37.319px_4.147px_rgba(0,0,0,0.08)] mt-8"
    >
      <Link href={PATHS.MY_ACCOUNT.ROOT.link}>
        <div className="flex items-center gap-3">
          {infoLoading ? (
            <ButtonLoading borderColor="text-black" />
          ) : infoError ? (
            <InlineError textColor="text-black" />
          ) : (
            <Avatar
              imgSrc={
                `${API_IMAGE_URL}${user?.photo}` || '/assets/user-avatar.png'
              }
              imgAlt="character"
              width={30}
              height={30}
            />
          )}
          <h5 className={`${isArabic ? 'text-base' : 'text-sm'} font-semibold`}>
            {t('completeAccountData')}
          </h5>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-2 mb-3">
        {/* Background Line */}
        <div className="h-[3px] bg-gray-300 w-full rounded-full relative">
          {/* Active Line inside */}
          <div
            className="h-[3px] bg-enjoy-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${accountAdvance}%` }}
          ></div>
        </div>
        <span className="text-sm font-semibold">{accountAdvance}%</span>
      </div>

      <div className={`mb-2 ${infoStyle}`}>
        <Wallet size={18} />
        <div>
          {isLoading ? (
            <ButtonLoading borderColor="border-black" />
          ) : error ? (
            <InlineError textColor="text-black" />
          ) : (
            <>
              {myWallet?.wallet_balance?.amount}{' '}
              {myWallet?.wallet_balance?.currency}
            </>
          )}
        </div>
      </div>

      <div className={`text-[var(--enjoy-secondary))] ${infoStyle}`}>
        <PiSparkleFill size={18} />
        <div className="flex items-center gap-2">
          {isLoading ? (
            <ButtonLoading borderColor="border-black" />
          ) : error ? (
            <InlineError textColor="text-black" />
          ) : (
            <>{myWallet?.points_balance}</>
          )}
          <span>{titleTxts('starsPoints')}</span>
        </div>
      </div>
    </CardWrapper>
  );
};

export default Information;
