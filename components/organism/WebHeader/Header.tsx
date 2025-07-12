import Input from '@/components/atomic/Input';
import Image from 'next/image';
import React, { useState } from 'react';
import Container from '../Container';
import { FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { PATHS } from '@/data/paths';
import { countries } from '@/data';
import CountryDialog from '@/components/molecules/CountryDialog';

const Header = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [open, setOpen] = useState(false);
  const [productsCount] = useState(0);

  const iconsStyle = 'w-9 h-9 text-[var(--enjoy-primary-deep)] cursor-pointer';

  return (
    <header className="bg-white" dir="ltr">
      <Container>
        <div className="flex items-center justify-between gap-10">
          {/* Language and Country */}
          <div className="flex items-center rounded-full py-2.5 px-4 border border-gray-300 overflow-hidden text-base font-semibold text-[var(--enjoy-primary-deep)]">
            <button className="cursor-pointer transition-opacity hover:opacity-70 text-sm">
              English
            </button>
            <span className="h-6 w-px bg-gray-200 mx-2"></span>
            <CountryDialog
              countries={countries}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              open={open}
              setOpen={setOpen}
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <Link href="#" className="relative">
              <MdOutlineShoppingCart className={iconsStyle} />
              {productsCount > 0 && (
                <div className="absolute -right-1 -top-2 flex items-center justify-center text-white bg-red-500 text-[12px] w-4 h-4 rounded-[50%]">
                  <span>{productsCount}</span>
                </div>
              )}
            </Link>
            <Link href={PATHS.LOGIN}>
              <FiUser className={iconsStyle} />
            </Link>
          </div>

          <form className="flex-1">
            <Input
              type="text"
              inputName="search"
              placeholder="إبحث عن بطاقة وعروض"
              Icon={IoSearch}
            />
          </form>

          {/* Right side - Logo and Icons */}
          <Link href={PATHS.HOME.link}>
            <Image
              src="/assets/logo.png"
              alt="Enjoy Games"
              title="Enjoy Games"
              width={100}
              height={100}
            />
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
