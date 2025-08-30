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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';
import { WalletProvider } from '@/context/WalletContext';

const PopupMenu: React.FC<PopupMenuProps> = ({ open, onOpenChange }) => {
  const { token, logout } = useAuthContext();
  const { isArabic } = useToggleLocale();
  const t = useTranslations('BtnTexts');
  const navBarPopupT = useTranslations('Layout.header.navBarPopup');

  const handleLogout = () => {
    logout();
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="top">
      <DrawerContent className="bg-[#f8f9ff] rounded-b-none border-none p-0 !max-h-full">
        <DrawerTitle className="sr-only">
          {navBarPopupT('PopupMenuTitle')}
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          {navBarPopupT('PopupMenuDescription')}
        </DrawerDescription>
        <PopupHeader onClose={() => onOpenChange(false)} />
        <div className="px-4 mt-4">
          {token ? (
            <WalletProvider>
              <AnimatedWrapper>
                <Information />
              </AnimatedWrapper>
            </WalletProvider>
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
      </DrawerContent>
    </Drawer>
  );
};

export default PopupMenu;
