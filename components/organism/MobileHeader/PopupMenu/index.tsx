'use client';
import React, { useState } from 'react';
import PopupHeader from './Sections/PopupHeader';
import { PopupMenuProps } from '@/interfaces';
import AuthButtons from './Sections/AuthButtons';
import Information from './Sections/Information';
import MenuLists from './Sections/MenuLists';
import CardWrapper from '@/components/atomic/CardWrapper';
import { FiLogOut } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';

const PopupMenu: React.FC<PopupMenuProps> = ({ animateClose, onClose }) => {
  const [isLogin] = useState(true);
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
        {!isLogin && <AuthButtons />}
        <AnimatedWrapper>
          <Information />
        </AnimatedWrapper>
        <MenuLists />
        {isLogin && (
          <AnimatedWrapper>
            <CardWrapper
              bgColor="bg-white"
              className="py-5 px-5 shadow-[0_8.293px_37.319px_4.147px_rgba(0,0,0,0.08)] mt-8 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 text-[var(--enjoy-error)]">
                <FiLogOut />
                <h4 className="text-[15px] font-normal">تسجيل خروج </h4>
              </div>
              <IoIosArrowBack className="text-[var(--enjoy-error)]" />
            </CardWrapper>
          </AnimatedWrapper>
        )}
      </div>
    </div>
  );
};

export default PopupMenu;
