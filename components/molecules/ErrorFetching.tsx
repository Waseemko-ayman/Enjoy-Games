'use client';
import React from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '../atomic/Button';

const ErrorFetching = () => {
  const t = useTranslations('Messages');
  const btnTxts = useTranslations('BtnTexts');
  const handleClick = () => {
    location.reload();
  };
  return (
    <div className="text-center px-3 mt-10 relative z-20">
      <Image
        src="/assets/cloud.png"
        alt="Cloud with a lightning bolt"
        title="Cloud with a lightning bolt"
        className="mx-auto animate-zoom"
        width={128}
        height={128}
      />
      <h2 className="text-center text-lg md:text-xl lg:text-2xl mt-4 mb-2">
        {t('errorMessage')}
      </h2>
      <Button
        handleClick={handleClick}
        Icon={FaArrowsRotate}
        otherClassName="py-3 px-8 mx-auto"
      >
        {btnTxts('LetsTryAgain')}
      </Button>
    </div>
  );
};

export default ErrorFetching;
