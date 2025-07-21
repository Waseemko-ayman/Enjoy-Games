import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { stats } from '@/data';
import { myAccountStatsProps, TranslationFunction } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Stats = ({ t }: { t: TranslationFunction }) => {
  const contents = (item: myAccountStatsProps) => {
    const Icon = item.icon;
    return (
      <>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-gray-500" size={12} />}
          <h4 className="text-base">{t(`statsTitles.${item.titleKey}`)}</h4>
        </div>
        {item.account !== undefined && (
          <div className="flex items-center justify-center gap-2 bg-[var(--enjoy-gray-200)] p-2 rounded-full">
            <span className="text-enjoy-primary text-xs font-bold">
              {item.account}
            </span>
            {item.currency && (
              <Image src={item.currency} alt="ريال" width={12} height={12} />
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <ul className="border-b border-gray-300 pb-7 space-y-2">
      {stats.map((item) => (
        <AnimatedWrapper key={item.id}>
          <li className="w-full flex items-center justify-between">
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
