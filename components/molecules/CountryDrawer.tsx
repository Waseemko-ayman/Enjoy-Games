import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { IoIosArrowBack } from 'react-icons/io';
import Image from 'next/image';
import { Country } from '@/interfaces';
import CountrySelectorContent from './CountrySelectorContent';

interface CountryDrawerProps {
  countries: Country[];
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CountryDrawer: React.FC<CountryDrawerProps> = ({
  countries,
  selectedCountry,
  setSelectedCountry,
  open,
  setOpen,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="flex items-center justify-between w-full gap-2 cursor-pointer">
          <div className="flex items-center gap-3">
            <Image
              src={`/assets/flags/${selectedCountry.img}.png`}
              alt={`${selectedCountry.name} - ${selectedCountry.currency}`}
              width={22}
              height={16}
            />
            <h4 className="text-lg font-normal">
              {selectedCountry.name} - {selectedCountry.currency}
            </h4>
          </div>
          <IoIosArrowBack />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">تغيير الدولة - العملة</DrawerTitle>
        <DrawerDescription className="sr-only">
          اختر الدولة والعملة المناسبة لك من القائمة أدناه.
        </DrawerDescription>
        <CountrySelectorContent
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          closeHandler={() => setOpen(false)}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default CountryDrawer;
