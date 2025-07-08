import React from 'react';
import Container from '../Container';
import { PiSquaresFourLight } from 'react-icons/pi';
import NavItem from '@/components/atomic/NavItem';
import { IoSearch } from 'react-icons/io5';
import DropdownNavItem from '@/components/molecules/DropdownMenuItem';
import { subMenuItems } from '@/data';

const Navbar = () => {
  return (
    <nav className="bg-white" dir="rtl">
      <Container>
        <ul className="flex items-center space-x-1">
          <li className="relative">
            <DropdownNavItem
              text="جميع الأقسام"
              Icon={PiSquaresFourLight}
              submenu={subMenuItems}
              isMainMenu={true}
            />
          </li>
          <li>
            <NavItem Icon={IoSearch} text="المتجر" />
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
