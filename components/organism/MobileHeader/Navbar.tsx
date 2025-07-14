'use client';
import React, { useState } from 'react';
import Container from '../Container';
import { MdMoreHoriz } from 'react-icons/md';
import Link from 'next/link';
import { navBarLinks } from '@/data/paths';
import PopupMenu from './PopupMenu';

const MobileNavbar = () => {
  const [showMore, setShowMore] = useState(false);
  const [animateClose, setAnimateClose] = useState(false);

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
            {navBarLinks.map((item) => (
              <li
                key={item.id}
                className="text-[var(--enjoy-gray-650)] font-medium"
              >
                <Link
                  href={item.link}
                  className="flex flex-col items-center font-medium"
                >
                  <item.icon className="text-2xl" />
                  <h5 className="text-base mt-2">{item.title}</h5>
                </Link>
              </li>
            ))}
            <li
              className="text-[var(--enjoy-gray-650)] font-medium !cursor-pointer"
              onClick={handleOpen}
            >
              <div className="flex flex-col items-center">
                <MdMoreHoriz className="text-2xl" />
                <h5 className="text-base mt-2">المزيد</h5>
              </div>
            </li>
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
