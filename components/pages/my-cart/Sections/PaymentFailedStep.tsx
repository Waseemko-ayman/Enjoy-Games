'use client';

import React from 'react';
import { Home, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import CardWrapper from '@/components/atomic/CardWrapper';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import Button from '@/components/atomic/Button';
import { PATHS } from '@/data/paths';

interface PaymentFailedStepProps {
  onRetry: () => void;
  errorMessage?: string; // added optional message prop
}

const PaymentFailedStep: React.FC<PaymentFailedStepProps> = ({
  onRetry,
  errorMessage,
}) => {
  const t = useTranslations('MyCart.order');
  const btnTexts = useTranslations('BtnTexts');

  return (
    <Layer otherClassName="!my-9 sm:!my-12">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <CardWrapper className="p-5 sm:p-8">
            <MotionSection index={0}>
              <div className="mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold mb-2 text-red-600">
                  {t('paymentFailedTitle')}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  {errorMessage || t('paymentFailedNote')}
                </p>
              </div>
            </MotionSection>

            <MotionSection index={1}>
              <Button
                href={PATHS.STORE.link}
                otherClassName="w-full py-3"
                Icon={Home}
                handleClick={onRetry}
              >
                {btnTexts('BackToStore')}
              </Button>
            </MotionSection>
          </CardWrapper>
        </div>
      </Container>
    </Layer>
  );
};

export default PaymentFailedStep;
