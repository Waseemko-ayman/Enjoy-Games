import { useCartContext } from '@/context/CartContext';
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
  const { cartItems } = useCartContext();

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
        {cartItems.length > 0 && (
          <div className="absolute -right-1 -top-2 flex items-center justify-center text-white bg-red-500 text-xs w-4 h-4 rounded-[50%]">
            <span className="font-sans">{cartItems.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupHeader;
