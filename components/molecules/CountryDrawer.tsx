import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';
import { Country, TranslationFunction } from '@/interfaces';
import CountrySelectorContent from './CountrySelectorContent';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';

interface CountryDrawerProps {
  countries: Country[];
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  t: TranslationFunction;
  isArabic: boolean;
}

const CountryDrawer: React.FC<CountryDrawerProps> = ({
  countries,
  selectedCountry,
  setSelectedCountry,
  open,
  setOpen,
  t,
  isArabic,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <AnimatedWrapper>
        <DrawerTrigger asChild>
          <button className="flex items-center justify-between w-full gap-2 cursor-pointer">
            <div className="flex items-center gap-3">
              <Image
                src={`/assets/flags/${selectedCountry.img}.png`}
                alt={`${selectedCountry.name} - ${selectedCountry.currency}`}
                width={22}
                height={16}
              />
              <h4 className="text-base font-normal">
                {selectedCountry.name} - {selectedCountry.currency}
              </h4>
            </div>
            {isArabic ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </button>
        </DrawerTrigger>
      </AnimatedWrapper>
      <DrawerContent>
        <DrawerTitle className="sr-only">
          {t('ChangeCountryCurrencyTitle')}
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          {t('ChangeCountryCurrencyDescription')}
        </DrawerDescription>
        <CountrySelectorContent
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          closeHandler={() => setOpen(false)}
          t={t}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default CountryDrawer;
