'use client';
import React from 'react';
import Container from '../Container';
import { PiSquaresFourLight } from 'react-icons/pi';
import NavItem from '@/components/atomic/NavItem';
import { IoSearch } from 'react-icons/io5';
import DropdownNavItem from '@/components/molecules/DropdownMenuItem';
import { subMenuItems } from '@/data';
import { PATHS } from '@/data/paths';
import { NavbarProps } from '@/interfaces';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const Navbar: React.FC<NavbarProps> = ({ layout = 'default', isMobile }) => {
  const t = useTranslations('Layout.header.navBar');

  if (layout === 'store') {
    return (
      <nav className={`${!isMobile ? 'bg-white' : 'pt-2 mt-4'}`}>
        <Container>
          <ul className="flex items-center gap-3 overflow-hidden">
            <li className="overflow-hidden relative">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <DropdownNavItem
                  text={t('allCategories')}
                  Icon={PiSquaresFourLight}
                  submenu={subMenuItems}
                  isMainMenu={true}
                />
              </motion.div>
            </li>
            <li className="overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <NavItem
                  Icon={IoSearch}
                  text={t('store')}
                  linkPath={PATHS.STORE.link}
                />
              </motion.div>
            </li>
          </ul>
        </Container>
      </nav>
    );
  }

  return (
    <nav className="bg-white">
      <Container>
        <ul className="flex items-center space-x-1">
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <DropdownNavItem
              text={t('allCategories')}
              Icon={PiSquaresFourLight}
              submenu={subMenuItems}
              isMainMenu={true}
            />
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <NavItem
              Icon={IoSearch}
              text={t('store')}
              linkPath={PATHS.STORE.link}
            />
          </motion.li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
