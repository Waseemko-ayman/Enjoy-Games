'use client';
import CardWrapper from '@/components/atomic/CardWrapper';
import Layer from '@/components/atomic/Layer';
import PageHeader from '@/components/molecules/PageHeader';
import Container from '@/components/organism/Container';
import Image from 'next/image';
import React from 'react';
import ButtonsDialogDrawer from './Sections/ButtonsDialogDrawer';

const WalletPage = () => {
  return (
    <div>
      <PageHeader showTitle={false} />
      <Layer otherClassName="!my-12">
        <Container>
          <CardWrapper
            bgColor="bg-enjoy-glass"
            className="py-[60px] px-5 !shadow-none"
          >
            <div className="text-center">
              <h5 className="text-sm font-bold">رصيدي الحالي</h5>
              <div className="flex items-center justify-center gap-1 mt-3 mb-5">
                <h2 className="text-3xl font-bold">0</h2>
                <Image
                  src={'/assets/saudi_riyal.png'}
                  alt="ريال سعودي"
                  width={25}
                  height={25}
                />
              </div>
              <ButtonsDialogDrawer />
            </div>
          </CardWrapper>
        </Container>
      </Layer>
    </div>
  );
};

export default WalletPage;
