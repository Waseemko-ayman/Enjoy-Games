import React from 'react';
import CardWrapper from '@/components/atomic/CardWrapper';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import { useTranslations } from 'next-intl';
import { useTotalPaid } from '@/context/TotalPaidContext';
import Loading from '@/components/molecules/loading';
import InlineError from '@/components/molecules/InlineError';
// import ButtonsDialogDrawer from './ButtonsDialogDrawer';

const WalletContent = () => {
  const t = useTranslations('Wallet');
  const { totalPaid, isLoading, error } = useTotalPaid();

  return (
    <Layer otherClassName="!my-12">
      <Container>
        <CardWrapper
          bgColor="bg-enjoy-glass"
          className="py-[60px] px-5 !shadow-none"
        >
          <div className="text-center">
            <MotionSection index={0}>
              <h5 className="text-sm font-bold">{t('title')}</h5>
            </MotionSection>
            {isLoading ? (
              <Loading />
            ) : error ? (
              <InlineError />
            ) : (
              <MotionSection index={1} className="mt-3 mb-5">
                <h2 className="text-3xl font-bold">
                  {totalPaid?.amount} {totalPaid?.currency}
                </h2>
              </MotionSection>
            )}
            {/* <MotionSection index={2}>
              <ButtonsDialogDrawer t={t} />
            </MotionSection> */}
          </div>
        </CardWrapper>
      </Container>
    </Layer>
  );
};

export default WalletContent;
