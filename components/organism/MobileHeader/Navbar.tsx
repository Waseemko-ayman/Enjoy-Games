'use client';
import React, { useState } from 'react';
import Container from '../Container';
import { MdMoreHoriz } from 'react-icons/md';
import Link from 'next/link';
import { navBarLinks } from '@/data/paths';
import PopupMenu from './PopupMenu';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '@/context/AuthContext';

const MobileNavbar = () => {
  const [showMore, setShowMore] = useState(false);
  const [animateClose, setAnimateClose] = useState(false);
  const t = useTranslations('PagesHeaderTitles');
  const { token } = useAuthContext();

  const handleOpen = () => {
    setShowMore(true);
    setAnimateClose(false);
  };

  const handleClose = () => {
    setAnimateClose(true);
    setTimeout(() => setShowMore(false), 300);
  };

  return (
    <>
      <div className="bg-white pt-3 pb-5 fixed right-0 bottom-0 w-full z-[999] shadow-[0_-6px_44px_0_rgba(0,0,0,0.1)]">
        <Container>
          <ul className="flex items-center justify-between gap-3">
            {navBarLinks
              .filter((item) => !(item.hideWhenAuth && token))
              .map((item, index) => (
                <li
                  key={item.id}
                  className="text-[var(--enjoy-gray-650)] font-medium"
                >
                  <AnimatedWrapper custom={index}>
                    {item.link ? (
                      <Link
                        href={item.link}
                        className="flex flex-col items-center font-medium"
                      >
                        <item.icon className="text-xl" />
                        <h5 className="text-sm mt-2">{t(item.titleKey)}</h5>
                      </Link>
                    ) : (
                      <div
                        className="flex flex-col items-center !cursor-pointer"
                        onClick={handleOpen}
                      >
                        <MdMoreHoriz className="text-xl" />
                        <h5 className="text-sm mt-2">{t('more')}</h5>
                      </div>
                    )}
                  </AnimatedWrapper>
                </li>
              ))}
          </ul>
        </Container>
      </div>

      {showMore && (
        <PopupMenu onClose={handleClose} animateClose={animateClose} />
      )}
    </>
  );
};

export default MobileNavbar;
