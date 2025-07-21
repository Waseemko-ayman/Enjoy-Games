import React from 'react';
import Button from '../atomic/Button';
import Image from 'next/image';
import { FaX } from 'react-icons/fa6';
import { TopBannerDrawerContentProps } from '@/interfaces';
import { useTranslations } from 'next-intl';

const TopBannerDrawerContent: React.FC<TopBannerDrawerContentProps> = ({
  isMobile,
  onClose,
  onDiscover,
}) => {
  const t = useTranslations('Layout.header.topBanner');
  const btnTxts = useTranslations('BtnTexts');
  return (
    <>
      <div className="relative bg-enjoy-secondary-light text-white h-80 rounded-t-3xl flex items-start justify-center overflow-hidden">
        <Image src="/assets/phone.png" alt="phone" width={300} height={300} />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>

      <div className="p-6 pt-0">
        <Button
          variant="forth"
          handleClick={onClose}
          otherClassName={`absolute ${
            isMobile ? 'top-9 left-5 w-7 h-7' : 'top-6 left-5 w-6 h-6'
          } shadow-sm`}
        >
          <FaX className="w-3 h-3 text-gray-600" />
        </Button>

        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold my-4">{t('popup.title')}</h2>
          <h3 className="text-[28px] font-bold text-enjoy-primary mb-4">
            {t('title')}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed font-medium mb-3">
            {t('popup.desc')}
          </p>
        </div>

        <Button otherClassName="w-full p-3" handleClick={onDiscover}>
          {btnTxts('FindItNow')}
        </Button>
      </div>
    </>
  );
};

export default TopBannerDrawerContent;
