import { useToggleLocale } from '@/hook/useToggleLocale';
import { useTranslations } from 'next-intl';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdOutlineShoppingCart } from 'react-icons/md';

const PopupHeader = ({ onClose }: { onClose: () => void }) => {
  const circularButtonContainerStyle =
    'relative bg-white flex items-center justify-between p-1 rounded-[50%]';

  const iconStyle = 'cursor-pointer';

  const { isArabic } = useToggleLocale();
  const t = useTranslations('PagesHeaderTitles');

  return (
    <div className="h-[60px] bg-enjoy-glass flex items-center justify-between gap-2 px-3">
      <div className={`${circularButtonContainerStyle} !bg-gray-300`}>
        {isArabic ? (
          <IoIosArrowForward
            className={`${iconStyle} text-sm`}
            onClick={onClose}
          />
        ) : (
          <IoIosArrowBack
            className={`${iconStyle} text-sm`}
            onClick={onClose}
          />
        )}
      </div>
      <h5 className="text-center text-lg font-bold w-full overflow-hidden whitespace-nowrap">
        {t('more')}
      </h5>
      <div
        className={`${circularButtonContainerStyle} border border-[var(--enjoy-gray-300)]`}
      >
        <MdOutlineShoppingCart
          className={`${iconStyle} text-lg text-enjoy-primary`}
        />
      </div>
    </div>
  );
};

export default PopupHeader;
