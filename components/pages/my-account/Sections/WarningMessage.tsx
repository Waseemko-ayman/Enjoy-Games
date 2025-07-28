import CardWrapper from '@/components/atomic/CardWrapper';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { TranslationFunction } from '@/interfaces';
import { AlertCircle } from 'lucide-react';
import React from 'react';

const WarningMessage = ({ t }: { t: TranslationFunction }) => {
  return (
    <AnimatedWrapper>
      <CardWrapper
        bgColor="bg-orange-50"
        className="border border-orange-200 p-4 !shadow-none"
      >
        <div className="flex items-center gap-1">
          <AlertCircle className="w-5 h-5 text-orange-500 ml-2" />
          <span className="text-sm text-orange-800">
            {t.rich('resendActivation', {
              resendSpan: (chunks) => (
                <span className="text-red-500 cursor-pointer">{chunks}</span>
              ),
            })}
          </span>
        </div>
      </CardWrapper>
    </AnimatedWrapper>
  );
};

export default WarningMessage;
