'use client';
import Button from '@/components/atomic/Button';
import CardWrapper from '@/components/atomic/CardWrapper';
import { EarningsPointsSectionProps } from '@/interfaces';
import Image from 'next/image';
import React from 'react';
import { PiSparkleFill } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cardVariants } from '@/lib/context';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { useWallet } from '@/context/WalletContext';
import ButtonLoading from '../atomic/ButtonLoading';
import InlineError from './InlineError';
import { PATHS } from '@/data/paths';

const EarningsPointsSection: React.FC<EarningsPointsSectionProps> = ({
  variant,
  totalAmount = 0,
  withdrawableAmount = 0,
  conversionRate,
  lastWithdrawalText,
  // firstButtonHref,
  // secondButtonHref,
  // btnTexts,
}) => {
  const t = useTranslations('PagesHeaderTitles');
  const starsTxt = useTranslations('Stars.pointsSystem');
  const maxupTxt = useTranslations('MaxupProgram.pointSystem');
  const sharedTexts = useTranslations('Shared');
  const { isArabic } = useToggleLocale();

  // API Context
  const { myWallet, isLoading, error } = useWallet();

  console.log(myWallet);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <CardWrapper
          bgColor="bg-enjoy-glass"
          className="p-5 flex items-center justify-between"
        >
          <div className="text-center mx-auto">
            <PiSparkleFill
              className="mx-auto mb-1 text-enjoy-secondary"
              size={40}
            />
            <h5 className="text-sm font-bold">
              {variant === 'earnings'
                ? maxupTxt('earnings.title')
                : starsTxt('actions.starPoints')}
            </h5>
            <div className="flex items-center justify-center gap-1 mt-2 mb-5">
              <h2 className="text-2xl font-bold">
                {variant === 'earnings' ? (
                  withdrawableAmount
                ) : isLoading ? (
                  <ButtonLoading borderColor="border-black" />
                ) : error ? (
                  <InlineError textColor="text-black" />
                ) : (
                  myWallet?.points_balance
                )}
              </h2>
              {variant === 'earnings' && (
                <Image
                  src={'/assets/saudi_riyal.png'}
                  alt="ريال سعودي"
                  width={25}
                  height={25}
                />
              )}
            </div>
            <Button
              href={PATHS.WALLET.link}
              otherClassName={`py-3 ${isArabic ? 'px-7' : 'px-4'} text-sm`}
            >
              {t('wallet')}
            </Button>
          </div>
        </CardWrapper>
      </motion.div>

      <div>
        <div className="flex items-center flex-col sm:flex-row gap-5 mb-5">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            className="w-full"
          >
            <CardWrapper
              bgColor="bg-enjoy-secondary-soft"
              className="p-3.5 !shadow-none w-full"
            >
              <h5 className="text-xs font-semibold mb-4 flex items-center gap-1">
                {variant === 'earnings'
                  ? maxupTxt('header.totalEarnings')
                  : starsTxt('conversionInfo.title')}
                {isLoading ? (
                  <ButtonLoading borderColor="border-black" />
                ) : error ? (
                  <InlineError textColor="text-black" />
                ) : (
                  <>{myWallet?.wallet_balance?.currency || 'ريال'}</>
                )}
              </h5>
              <div
                className={`flex items-center ${
                  variant === 'earnings' ? 'justify-between' : 'gap-1'
                }`}
              >
                {variant === 'earnings' ? (
                  <>
                    <span className="text-lg font-semibold">{totalAmount}</span>
                    <Image
                      src="/assets/saudi_riyal.png"
                      alt="ريال سعودي"
                      width={15}
                      height={15}
                    />
                  </>
                ) : (
                  <>
                    <span className="text-lg font-semibold">
                      {conversionRate} ={' '}
                      {isLoading ? (
                        <ButtonLoading borderColor="border-black" />
                      ) : error ? (
                        <InlineError textColor="text-black" />
                      ) : (
                        <>
                          {myWallet?.points_to_cash?.amount}{' '}
                          {myWallet?.points_to_cash?.currency}
                        </>
                      )}
                    </span>
                  </>
                )}
              </div>
            </CardWrapper>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            className="w-full"
          >
            <CardWrapper
              bgColor="bg-enjoy-primary-soft"
              className="p-3.5 !shadow-none w-full"
            >
              <h5 className="text-xs font-semibold mb-4">
                {variant === 'earnings'
                  ? maxupTxt('pointSystem.header.title')
                  : starsTxt('pointsSummary.title')}
              </h5>
              {variant === 'earnings' ? (
                <span className="text-lg font-semibold">0</span>
              ) : (
                <span className="text-lg font-semibold">
                  {starsTxt('pointsSummary.value', {
                    points: myWallet?.points_balance || 0,
                  })}
                  {/* {starsTxt('pointsSummary.value', {
                    points: isLoading ? (
                      <ButtonLoading borderColor="border-black" />
                    ) : error ? (
                      <InlineError textColor="text-black" />
                    ) : (
                      myWallet?.points_balance || 0
                    ),
                  })} */}
                </span>
              )}
            </CardWrapper>
          </motion.div>
        </div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <h5 className="text-base font-bold mb-3.5">
            {variant === 'earnings'
              ? sharedTexts('procedures.last')
              : sharedTexts('procedures.default')}
          </h5>
          <CardWrapper
            bgColor="bg-white"
            className="p-5 border border-[#f4f4f4] max-h-[100px] overflow-y-auto scrollbar-none"
          >
            {lastWithdrawalText}
          </CardWrapper>
        </motion.div>
      </div>
    </div>
  );
};

export default EarningsPointsSection;
