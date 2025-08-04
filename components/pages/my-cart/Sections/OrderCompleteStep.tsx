import React from 'react';
import { Check, Download, Home } from 'lucide-react';
import { PATHS } from '@/data/paths';
import { useTranslations } from 'next-intl';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import CardWrapper from '@/components/atomic/CardWrapper';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import Button from '@/components/atomic/Button';

interface OrderCompleteStepProps {
  onReturnToStore: () => void;
  orderNumber: string;
  amountCents?: number;
  currency?: string;
}

const OrderCompleteStep: React.FC<OrderCompleteStepProps> = ({
  onReturnToStore,
  orderNumber,
  amountCents,
  currency = 'ر.س.',
}) => {
  const t = useTranslations('MyCart.order');
  const btnTexts = useTranslations('BtnTexts');
  const points = 1000;

  return (
    <Layer otherClassName="!my-9 sm:!my-12">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <CardWrapper className="p-5 sm:p-8">
            <MotionSection index={0}>
              <div className="mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold mb-2">
                  {t('orderCompleteMessage')}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  {t('orderCompleteThanks')}
                </p>
              </div>
            </MotionSection>

            <MotionSection index={1}>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">{t('orderNumberLabel')}</span>
                  <span className="font-bold text-base sm:text-lg">
                    #{orderNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">{t('orderStatusLabel')}</span>
                  <span className="text-green-600 font-semibold">مؤكد</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">
                    {t('paymentAmountLabel')}
                  </span>
                  <span className="font-semibold">
                    {amountCents ? (amountCents / 100).toFixed(2) : '0.00'}{' '}
                    {currency}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {t('deliveryMethodLabel')}
                  </span>
                  <span className="font-semibold">فوري (رقمياً)</span>
                </div>
              </div>
            </MotionSection>

            <MotionSection index={2}>
              <div className="space-y-4">
                <Button
                  otherClassName="w-full py-3"
                  Icon={Download}
                  iconPosition="left"
                >
                  {btnTexts('DownloadInvoice')}
                </Button>

                <Button
                  variant="secondary"
                  href={PATHS.STORE.link}
                  otherClassName="w-full py-3"
                  Icon={Home}
                  iconPosition="left"
                  handleClick={onReturnToStore}
                >
                  {btnTexts('BackToStore')}
                </Button>
              </div>
            </MotionSection>

            <MotionSection index={3}>
              <div className="mt-6 sm:mt-8 p-4 bg-enjoy-glass rounded-lg">
                <div className="flex items-center justify-center gap-2 text-enjoy-primary mb-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-semibold">
                    {t('pointsAddedMessage', { points })}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{t('pointsUsageInfo')}</p>
              </div>
            </MotionSection>
          </CardWrapper>
        </div>
      </Container>
    </Layer>
  );
};

export default OrderCompleteStep;
