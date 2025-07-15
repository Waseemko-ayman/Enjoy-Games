import Input from '@/components/atomic/Input';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Container from '../Container';
import { FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { PATHS } from '@/data/paths';
import { countries, userList } from '@/data';
import CountryDialog from '@/components/molecules/CountryDialog';
import CardWrapper from '@/components/atomic/CardWrapper';
import NavItem from '@/components/atomic/NavItem';

const Header = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [productsCount] = useState(0);
  const [isLogin] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const iconsStyle = 'w-9 h-9 text-[var(--enjoy-primary-deep)] cursor-pointer';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white" dir="ltr">
      <Container>
        <div className="flex items-center justify-between gap-10">
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

          <div className="flex items-center gap-5">
            <Link href={PATHS.CART.link} className="relative">
              <MdOutlineShoppingCart className={iconsStyle} />
              {productsCount > 0 && (
                <div className="absolute -right-1 -top-2 flex items-center justify-center text-white bg-red-500 text-xs w-4 h-4 rounded-[50%]">
                  <span>{productsCount}</span>
                </div>
              )}
            </Link>
            {isLogin ? (
              <div className="relative" ref={menuRef}>
                <FiUser
                  className={iconsStyle}
                  onClick={() => setIsOpen((prev) => !prev)}
                />
                {isOpen && (
                  <CardWrapper className="absolute top-[120%] left-0 z-50 bg-white p-2 w-[212px]">
                    <ul dir="rtl">
                      {userList.map((section, index) => {
                        if (section.section === 'rank') {
                          return (
                            <div
                              key={index}
                              className="border-b border-b-gray-200 px-2 py-3"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <h5 className="font-semibold text-sm">
                                    {section.rank?.title}
                                  </h5>
                                  <div className="bg-enjoy-primary text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
                                    {section.rank?.level}
                                  </div>
                                </div>
                                <p className="text-xs text-enjoy-primary font-medium">
                                  {section.rank?.subtitle}
                                </p>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={index}
                            className="border-b border-b-gray-200 pb-2 last:border-0"
                          >
                            {section.items?.map((item) => (
                              <li key={item.id} className="w-full">
                                <NavItem
                                  Icon={item.icon}
                                  text={item.title}
                                  otherClassNameIcon="text-gray-500 text-sm"
                                  otherClassName="!px-2 !py-3 !text-sm hover:bg-[#f4f4ff] rounded-lg"
                                  linkPath={item.link}
                                  // badge={item.badge}
                                />
                              </li>
                            ))}
                          </div>
                        );
                      })}
                    </ul>
                  </CardWrapper>
                )}
              </div>
            ) : (
              <Link href={PATHS.LOGIN}>
                <FiUser className={iconsStyle} />
              </Link>
            )}
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
