import React from 'react';
import CardWrapper from '@/components/atomic/CardWrapper';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import { useTranslations } from 'next-intl';
import InlineError from '@/components/molecules/InlineError';
import ButtonsDialogDrawer from './ButtonsDialogDrawer';
import { PiSparkleFill } from 'react-icons/pi';
import { Wallet } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import ButtonLoading from '@/components/atomic/ButtonLoading';

const WalletContent = () => {
  const t = useTranslations('Wallet');
  const starsTxt = useTranslations('Stars.pointsSystem');

  const { myWallet, isLoading, error } = useWallet();

  return (
    <Layer otherClassName="!my-12">
      <Container>
        <CardWrapper
          bgColor="bg-enjoy-glass"
          className="py-[60px] px-5 !shadow-none"
        >
          <div className="text-center max-w-fit mx-auto">
            <div className="flex items-center justify-center gap-10 mt-2 mb-5">
              <div>
                <Wallet
                  className="mx-auto mb-1 text-enjoy-secondary"
                  size={40}
                />
                <MotionSection index={0}>
                  <h5 className="text-sm font-bold">{t('title')}</h5>
                </MotionSection>
                <MotionSection index={1} className="mt-3 mb-5">
                  <h2 className="text-3xl font-bold">
                    {isLoading ? (
                      <ButtonLoading borderColor="border-black" />
                    ) : error ? (
                      <InlineError textColor="text-black" />
                    ) : (
                      <>
                        {myWallet?.wallet_balance?.amount}{' '}
                        {myWallet?.wallet_balance?.currency}
                      </>
                    )}
                  </h2>
                </MotionSection>
              </div>
              <div>
                <PiSparkleFill
                  className="mx-auto mb-1 text-enjoy-secondary"
                  size={40}
                />
                <h5 className="text-sm font-bold">
                  {starsTxt('actions.starPoints')}
                </h5>
                <div className="flex items-center justify-center gap-1 mt-2 mb-5">
                  <h2 className="text-3xl font-bold">
                    {isLoading ? (
                      <ButtonLoading borderColor="border-black" />
                    ) : error ? (
                      <InlineError textColor="text-black" />
                    ) : (
                      <>{myWallet?.points_balance}</>
                    )}
                  </h2>
                </div>
              </div>
            </div>
            <MotionSection index={2}>
              <ButtonsDialogDrawer t={t} points={myWallet?.points_balance} />
            </MotionSection>
          </div>
        </CardWrapper>
      </Container>
    </Layer>
  );
};

export default WalletContent;
