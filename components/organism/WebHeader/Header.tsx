import Input from '@/components/atomic/Input';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Container from '../Container';
import { FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { PATHS } from '@/data/paths';
import { countries } from '@/data';
import CountryDialog from '@/components/molecules/CountryDialog';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import UserPopup from './UserPopup';
import { useToggleLocale } from '@/hook/useToggleLocale';
import Button from '@/components/atomic/Button';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '@/context/AuthContext';
import { useCartContext } from '@/context/CartContext';

const Header = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useAuthContext();
  const menuRef = useRef<HTMLDivElement>(null);
  const { toggleLocale, isArabic } = useToggleLocale();
  const t = useTranslations('Inputs.placeHolders');
  const langTexts = useTranslations('Languages');
  const ariaTxts = useTranslations('ariaLabels.links');
  const { cartItems } = useCartContext();

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
    <header className="bg-white">
      <Container>
        <div className="flex items-center justify-between gap-10">
          {/* Logo */}
          <AnimatedWrapper direction="y" distance={-40}>
            <Link href={PATHS.HOME.link}>
              <Image
                src="/assets/logo.png"
                alt="Enjoy Games Logo"
                title="Enjoy Games"
                width={100}
                height={100}
              />
            </Link>
          </AnimatedWrapper>

          <form className="flex-1">
            <AnimatedWrapper direction="y" distance={-40}>
              <Input
                type="text"
                inputName="search"
                placeholder={t('cardAndOffersSearch')}
                Icon={IoSearch}
              />
            </AnimatedWrapper>
          </form>

          <div className="flex items-center gap-5">
            {token ? (
              <div className="relative" ref={menuRef}>
                <AnimatedWrapper direction="y" distance={40}>
                  <FiUser
                    className={iconsStyle}
                    onClick={() => setIsOpen((prev) => !prev)}
                  />
                </AnimatedWrapper>
                {isOpen && <UserPopup />}
              </div>
            ) : (
              <AnimatedWrapper direction="y" distance={40}>
                <Link href={PATHS.LOGIN}>
                  <FiUser className={iconsStyle} />
                </Link>
              </AnimatedWrapper>
            )}
            <AnimatedWrapper direction="y" distance={-40}>
              <Link
                href={PATHS.MY_CART.link}
                aria-label={ariaTxts('myCartPage')}
                className="relative"
              >
                <MdOutlineShoppingCart className={iconsStyle} />
                {cartItems.length > 0 && (
                  <div className="absolute -right-1 -top-2 flex items-center justify-center text-white bg-red-500 text-xs w-4 h-4 rounded-[50%]">
                    <span className="font-sans">{cartItems.length}</span>
                  </div>
                )}
              </Link>
            </AnimatedWrapper>
          </div>

          <AnimatedWrapper>
            <div className="flex items-center rounded-full py-2.5 px-4 border border-gray-300 overflow-hidden text-base font-semibold text-[var(--enjoy-primary-deep)]">
              <CountryDialog
                countries={countries}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                open={open}
                setOpen={setOpen}
              />
              <span className="h-6 w-px bg-gray-200 mx-2"></span>
              <Button
                handleClick={toggleLocale}
                variant="ghost"
                otherClassName="text-enjoy-primary-deep transition-opacity hover:opacity-70 text-sm"
              >
                {isArabic ? langTexts('english') : langTexts('arabic')}
              </Button>
            </div>
          </AnimatedWrapper>
        </div>
      </Container>
    </header>
  );
};

export default Header;
