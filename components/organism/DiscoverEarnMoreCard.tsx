'use client';
import CardWrapper from '@/components/atomic/CardWrapper';
import ResponsiveDialogDrawer from '@/components/organism/ResponsiveDialogDrawer';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Container from './Container';
import useIsMobile from '@/hook/useIsMobile';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';
import { DiscoverEarnMoreCardProps } from '@/interfaces';

const DiscoverEarnMoreCard: React.FC<DiscoverEarnMoreCardProps> = ({
  title,
  description,
  imageSrc,
  children,
  cardClassName = '',
  triggerClassName = '',
}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  return (
    <Container>
      <AnimatedWrapper>
        <CardWrapper
          className={`flex items-center gap-4 sm:gap-7 p-6 max-w-xl mx-auto -mt-36 ${cardClassName}`}
        >
          <Image
            src={`/assets/${imageSrc}`}
            alt="character"
            width={90}
            height={90}
          />
          <div className="w-full">
            <h3 className="text-xl mb-2.5">{title}</h3>
            <ResponsiveDialogDrawer
              open={open}
              setOpen={setOpen}
              isMobile={isMobile}
              trigger={
                <div
                  className={`text-sm sm:text-base text-enjoy-primary font-semibold flex items-center justify-between gap-1 cursor-pointer ${triggerClassName}`}
                >
                  <p>{description}</p>
                  <IoIosArrowBack />
                </div>
              }
            >
              <div className="max-h-screen overflow-y-auto scrollbar-none">
                {children}
              </div>
            </ResponsiveDialogDrawer>
          </div>
        </CardWrapper>
      </AnimatedWrapper>
    </Container>
  );
};

export default DiscoverEarnMoreCard;
