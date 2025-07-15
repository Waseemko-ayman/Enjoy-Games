import React from 'react';
import Container from '../Container';
import { PiSquaresFourLight } from 'react-icons/pi';
import NavItem from '@/components/atomic/NavItem';
import { IoSearch } from 'react-icons/io5';
import DropdownNavItem from '@/components/molecules/DropdownMenuItem';
import { subMenuItems } from '@/data';
import { PATHS } from '@/data/paths';
import { NavbarProps } from '@/interfaces';

const Navbar: React.FC<NavbarProps> = ({ layout = 'default', isMobile }) => {
  if (layout === 'store') {
    return (
      <nav className={`${!isMobile ? 'bg-white' : 'pt-2 mt-4'}`} dir="rtl">
        <Container>
          <ul
            className={`flex items-center ${
              isMobile ? 'justify-center flex-wrap gap-4' : 'gap-7'
            }`}
          >
            {subMenuItems.map((item) => (
              <NavItem
                key={item.label}
                Icon={item.Icon}
                text={item.label}
                linkPath={item.path}
                layout={layout}
                isMobile={isMobile}
              />
            ))}
          </ul>
        </Container>
      </nav>
    );
  }

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
            <NavItem
              Icon={IoSearch}
              text="المتجر"
              linkPath={PATHS.STORE.link}
            />
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
