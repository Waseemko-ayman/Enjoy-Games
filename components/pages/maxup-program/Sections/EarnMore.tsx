'use client';
import CardWrapper from '@/components/atomic/CardWrapper';
import EarnMoreDrawerCard from '@/components/molecules/EarnMoreDrawerCard';
import Container from '@/components/organism/Container';
import ResponsiveDialogDrawer from '@/components/organism/ResponsiveDialogDrawer';
import { inviteStepsData } from '@/data';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const EarnMore = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      <CardWrapper className="flex items-center gap-4 sm:gap-7 p-6 max-w-xl mx-auto -mt-36">
        <Image
          src="/assets/character.png"
          alt="character"
          width={90}
          height={90}
        />
        <div className="w-full">
          <h3 className="text-xl mb-2.5">إكتشف مكسب الآن</h3>
          <ResponsiveDialogDrawer
            open={open}
            setOpen={setOpen}
            isMobile={isMobile}
            trigger={
              <div className="text-sm sm:text-base text-enjoy-primary font-semibold flex items-center justify-between gap-1 cursor-pointer">
                <p>تعرف كيف تزيد مكسبك وترتقي في المستويات!</p>
                <IoIosArrowBack />
              </div>
            }
          >
            {inviteStepsData.map((step, index) => (
              <EarnMoreDrawerCard
                key={step.id}
                id={step.id}
                title={step.title}
                description={step.description}
                image={step.image}
                footerType={step.footerType}
                order={step.order}
                otherClassName={
                  index !== inviteStepsData.length - 1
                    ? 'border-b border-gray-300'
                    : ''
                }
              />
            ))}
          </ResponsiveDialogDrawer>
        </div>
      </CardWrapper>
    </Container>
  );
};

export default EarnMore;
