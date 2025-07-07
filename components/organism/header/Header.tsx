import Input from '@/components/atomic/Input';
import Image from 'next/image';
import React from 'react';
import Container from '../Container';
import { FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';

const Header = () => {
  return (
    <header className="bg-white" dir="ltr">
      <Container>
        <div className="flex items-center justify-between gap-10">
          {/* Language and Country */}
          <div className="flex items-center rounded-full py-2.5 px-4 border border-gray-300 overflow-hidden text-base font-semibold text-[var(--daleel-primary-deep)]">
            <button className="cursor-pointer transition-opacity hover:opacity-70 text-sm">
              English
            </button>
            <span className="h-6 w-px bg-gray-200 mx-2"></span>
            <div className="flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-70">
              <div className="flex items-center gap-1">
                <IoIosArrowBack className="text-lg" />
                <span>السعودية - ريال سعودي</span>
              </div>
              <Image
                src="/saudi-flag.png"
                alt="Saudi Flag"
                className="w-6 h-4 object-cover"
                width={80}
                height={80}
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <Link href="#">
              <MdOutlineShoppingCart className="w-9 h-9 text-[var(--daleel-primary-deep)] cursor-pointer" />
            </Link>
            <Link href="#">
              <FiUser className="w-9 h-9 text-[var(--daleel-primary-deep)] cursor-pointer" />
            </Link>
          </div>

          <form className="flex-1 flex items-center justify-between gap-0.5 px-3 text-[var(--daleel-primary-deep)] bg-[var(--daleel-glass-lavender)] rounded-4xl">
            <IoSearch className="cursor-pointer text-2xl" />
            <Input
              type="text"
              inputName="search"
              placeholder="إبحث عن بطاقة وعروض"
              otherClassName="flex-1"
            />
          </form>

          {/* Right side - Logo and Icons */}
          <Image
            src="/assets/logo.png"
            alt="Enjoy Games"
            title="Enjoy Games"
            width={100}
            height={100}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
