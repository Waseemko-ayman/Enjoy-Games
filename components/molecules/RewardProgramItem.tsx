import { RewardProgramItemProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const RewardProgramItem = ({ program, isSelected }: RewardProgramItemProps) => {
  const t = useTranslations('Wallet.rewardsPrograms');
  const sharedTxt = useTranslations('Shared');
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-2">
        <div
          className={`w-6 h-6 rounded-full border flex items-center justify-center ${
            isSelected
              ? 'border-[var(--enjoy-primary)] bg-[var(--enjoy-primary)]'
              : 'border-gray-300'
          }`}
        >
          {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
        </div>
        <h4 className="font-semibold text-base">{t(`${program.key}`)}</h4>
      </div>
      {program.description && (
        <p className="text-xs sm:text-sm text-gray-600 bg-[var(--enjoy-gray-100)] py-2.5 px-2 rounded-lg flex items-center gap-1">
          {t(program.description)}:{' '}
          <div className="text-[var(--enjoy-success)] flex items-center gap-1">
            {program.amount}{' '}
            {program.type === 'earnings' ? (
              <Image
                src="/assets/saudi_riyal.png"
                alt="saudi_riyal"
                width={14}
                height={14}
              />
            ) : (
              <span>{sharedTxt(program.currency)}</span>
            )}
          </div>
        </p>
      )}
    </div>
  );
};

export default RewardProgramItem;
