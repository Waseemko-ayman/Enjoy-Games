import React from 'react';
import Button from '../atomic/Button';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { IoIosArrowBack } from 'react-icons/io';
import Image from 'next/image';
import { FiLogIn } from 'react-icons/fi';
import { CountryDrawerProps } from '@/interfaces';

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
          <h4 className="flex items-center gap-3 text-lg font-normal">
            {selectedCountry}
          </h4>
          <IoIosArrowBack />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <h5 className="text-xl font-bold mb-6">تغيير الدولة - العملة</h5>
        <div className="max-h-[400px] overflow-y-auto space-y-4 mb-5 px-2 scrollbar-none">
          <ul className="space-y-4">
            {countries.map((country, index) => {
              const isSelected =
                selectedCountry === `${country.name} - ${country.currency}`;
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedCountry(`${country.name} - ${country.currency}`);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between gap-4 cursor-pointer border p-2 rounded-md ${
                    isSelected
                      ? 'border-[var(--enjoy-primary)]'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={`/assets/flags/${country.img}.png`}
                      alt={`${country.name} - ${country.currency}`}
                      width={22}
                      height={16}
                    />
                    <span className="text-lg">
                      {country.name} - {country.currency}
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 bg-white rounded-full border ${
                      isSelected
                        ? 'border-4 border-[var(--enjoy-primary)]'
                        : 'border-gray-300'
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-2 px-2">
          <Button
            otherClassName="w-full py-1.5"
            iconPosition="left"
            Icon={FiLogIn}
          >
            حفظ
          </Button>
          <Button
            variant="forth"
            otherClassName="w-full py-1.5"
            handleClick={() => setOpen(false)}
          >
            إلغاء
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CountryDrawer;
