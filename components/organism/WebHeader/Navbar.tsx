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

  // const dispatch = useDispatch();
  // const { categories, isLoading } = useSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(getAllProductsAction());
  // }, []);

  if (layout === 'store') {
    return (
      <nav className={`${!isMobile ? 'bg-white' : 'pt-2 mt-4'}`}>
        <Container>
          <ul
            className={`flex items-center ${
              isMobile ? 'justify-center flex-wrap gap-4' : 'gap-7'
            }`}
          >
            {subMenuItems.map((item) => (
              <NavItem
                key={item.name}
                icon={item.icon}
                name={item.name}
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
              name={t('allCategories')}
              icon={PiSquaresFourLight}
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
              icon={IoSearch}
              name={t('store')}
              linkPath={PATHS.STORE.link}
            />
          </motion.li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
