import { RewardProgramItemProps } from '@/interfaces';
import React from 'react';

const RewardProgramItem = ({ program, isSelected }: RewardProgramItemProps) => {
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
        <h4 className="font-semibold text-base">{program.title}</h4>
      </div>
      {program.description && (
        <p className="text-[12px] sm:text-sm text-gray-600 bg-[var(--enjoy-gray-100)] py-2.5 px-2 rounded-lg">
          {program.description}:{' '}
          <span className="text-[var(--enjoy-success)]">
            {program.amount}
            {program.currency}
          </span>
        </p>
      )}
    </div>
  );
};

export default RewardProgramItem;
