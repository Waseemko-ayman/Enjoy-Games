'use client';
import React from 'react';
import PopupHeader from './Sections/PopupHeader';
import { PopupMenuProps } from '@/interfaces';
import AuthButtons from './Sections/AuthButtons';
import Information from './Sections/Information';
import MenuLists from './Sections/MenuLists';
import CardWrapper from '@/components/atomic/CardWrapper';
import { FiLogOut } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { useAuthContext } from '@/context/AuthContext';

const PopupMenu: React.FC<PopupMenuProps> = ({ animateClose, onClose }) => {
  const { token } = useAuthContext();
  const t = useTranslations('BtnTexts');
  const { isArabic } = useToggleLocale();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-[#f8f9ff] z-[1000] ${
        animateClose
          ? 'animate-out slide-out-to-top duration-300'
          : 'animate-in slide-in-from-top duration-300'
      }`}
    >
      <PopupHeader onClose={onClose} />
      <div className="px-4 mt-4">
        {token ? (
          <AnimatedWrapper>
            <Information />
          </AnimatedWrapper>
        ) : (
          <AuthButtons t={t} />
        )}
        <MenuLists />
        {token && (
          <AnimatedWrapper>
            <CardWrapper
              bgColor="bg-white"
              className="py-5 px-5 shadow-[0_8.293px_37.319px_4.147px_rgba(0,0,0,0.08)] mt-8 flex items-center justify-between"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-3 text-[var(--enjoy-error)]">
                <FiLogOut />
                <h4 className="text-[15px] font-normal">{t('logout')}</h4>
              </div>
              {isArabic ? (
                <IoIosArrowBack className="text-[var(--enjoy-error)]" />
              ) : (
                <IoIosArrowForward className="text-[var(--enjoy-error)]" />
              )}
            </CardWrapper>
          </AnimatedWrapper>
        )}
      </div>
    </div>
  );
};

export default PopupMenu;
