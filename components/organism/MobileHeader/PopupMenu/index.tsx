import React from 'react';
import PopupHeader from './Sections/PopupHeader';
import { PopupMenuProps } from '@/interfaces';
import AuthButtons from './Sections/AuthButtons';
import Information from './Sections/Information';
import MenuLists from './Sections/MenuLists';

const PopupMenu: React.FC<PopupMenuProps> = ({ animateClose, onClose }) => {
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
        <AuthButtons />
        <Information />
        <MenuLists />
      </div>
    </div>
  );
};

export default PopupMenu;
