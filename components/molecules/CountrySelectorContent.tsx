import React from 'react';
import Image from 'next/image';
import Button from '../atomic/Button';
import { FiLogIn } from 'react-icons/fi';
import { CountrySelectorContentProps } from '@/interfaces';
import SelectableList from './SelectableList';

const CountrySelectorContent: React.FC<CountrySelectorContentProps> = ({
  countries,
  selectedCountry,
  setSelectedCountry,
  closeHandler,
}) => {
  return (
    <>
      <h5 className="text-lg font-bold mb-5">تغيير الدولة - العملة</h5>
      <div className="max-h-[400px] overflow-y-auto space-y-4 mb-5 px-2 scrollbar-none">
        <SelectableList
          items={countries}
          selectedItem={selectedCountry}
          getKey={(item) => item.name}
          onSelect={(item) => {
            setSelectedCountry(item);
            closeHandler();
          }}
          renderContent={(country, isSelected) => (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={`/assets/flags/${country.img}.png`}
                  alt={`${country.name} - ${country.currency}`}
                  width={22}
                  height={16}
                />
                <span className="text-base font-medium">
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
            </div>
          )}
        />
      </div>

      <div className="flex items-center justify-between gap-2 px-2">
        <Button otherClassName="w-full py-2" iconPosition="left" Icon={FiLogIn}>
          حفظ
        </Button>
        <Button
          variant="forth"
          otherClassName="w-full py-2"
          handleClick={closeHandler}
        >
          إلغاء
        </Button>
      </div>
    </>
  );
};

export default CountrySelectorContent;
