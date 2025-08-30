import ButtonLoading from '@/components/atomic/ButtonLoading';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import InlineError from '@/components/molecules/InlineError';
import { PATHS } from '@/data/paths';
import { myAccountStatsProps, TranslationFunction } from '@/interfaces';
import { Wallet } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { FaHeart, FaStar } from 'react-icons/fa6';

const Stats = ({
  t,
  walletBalance,
  points,
  getLoading,
  getError,
}: {
  t: TranslationFunction;
  walletBalance: string;
  points: number;
  getLoading: boolean;
  getError: string;
}) => {
  const getCardValue = (value?: string | number) => {
    if (getLoading) return <ButtonLoading borderColor="border-black" />;
    if (getError)
      return (
        <InlineError textColor="text-enjoy-primary" otherClassName="text-xs" />
      );
    return value ?? 0;
  };

  const stats = [
    {
      id: 1,
      icon: Wallet,
      titleKey: 'balance',
      amount: getCardValue(walletBalance),
      // currency: myWallet?.wallet_balance?.currency,
    },
    {
      id: 2,
      icon: FaStar,
      titleKey: 'currentLevel',
      amount: getCardValue(points),
    },
    {
      id: 3,
      icon: FaHeart,
      titleKey: 'interests',
      href: PATHS.MY_ACCOUNT.INTERESTS.link,
    },
  ];

  const contents = (item: myAccountStatsProps) => {
    const Icon = item.icon;
    return (
      <>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-gray-500" size={12} />}
          <h4 className="text-base">{t(`statsTitles.${item.titleKey}`)}</h4>
        </div>
        {item.amount !== undefined && (
          <div className="flex items-center justify-center gap-1 bg-[var(--enjoy-gray-200)] p-2 rounded-full">
            <span className="text-enjoy-primary text-xs font-bold">
              {item.amount}
            </span>
            {/* {item.currency} */}
          </div>
        )}
      </>
    );
  };

  return (
    <ul className="border-b border-gray-300 pb-7 space-y-2">
      {stats.map((item) => (
        <AnimatedWrapper key={item.id}>
          <li className="w-full flex items-center justify-between gap-3">
            {item.href ? (
              <Link href={item.href}>{contents(item)}</Link>
            ) : (
              contents(item)
            )}
          </li>
        </AnimatedWrapper>
      ))}
    </ul>
  );
};

export default Stats;
