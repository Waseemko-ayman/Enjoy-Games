import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { TranslationFunction } from '@/interfaces';
import { AlertCircle } from 'lucide-react';
import React from 'react';

const DeleteAccount = ({ t }: { t: TranslationFunction }) => {
  return (
    <AnimatedWrapper>
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-red-500" />
        <p className="text-gray-400 text-sm cursor-pointer">
          {t.rich('AccountDelete', {
            deleteSpan: (chunks) => (
              <span className="text-red-500 text-[15px] font-semibold">
                {chunks}
              </span>
            ),
          })}
        </p>
      </div>
    </AnimatedWrapper>
  );
};

export default DeleteAccount;
