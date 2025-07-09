import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { IoIosArrowBack } from 'react-icons/io';
import Image from 'next/image';
import CountrySelectorContent from './CountrySelectorContent';
import { Country } from '@/interfaces';

interface CountryDrawerProps {
  countries: Country[];
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CountryDialog: React.FC<CountryDrawerProps> = ({
  countries,
  selectedCountry,
  setSelectedCountry,
  open,
  setOpen,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-between w-full gap-2 cursor-pointer">
          <IoIosArrowBack />
          <div className="flex items-center gap-3">
            <h4 className="text-lg font-normal">
              {selectedCountry.name} - {selectedCountry.currency}
            </h4>
            <Image
              src={`/assets/flags/${selectedCountry.img}.png`}
              alt={`${selectedCountry.name} - ${selectedCountry.currency}`}
              width={22}
              height={16}
            />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">تغيير الدولة - العملة</DialogTitle>
          <DialogDescription className="sr-only">
            اختر الدولة والعملة المناسبة لك من القائمة أدناه.
          </DialogDescription>
        </DialogHeader>

        <CountrySelectorContent
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          closeHandler={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CountryDialog;
