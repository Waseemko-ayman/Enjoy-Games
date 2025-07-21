import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';
import CountrySelectorContent from './CountrySelectorContent';
import { Country } from '@/interfaces';
import CustomDialog from './CustomDialog';
import { useToggleLocale } from '@/hook/useToggleLocale';

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
  const { isArabic } = useToggleLocale();
  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      title="تغيير الدولة - العملة"
      description="اختر الدولة والعملة المناسبة لك من القائمة أدناه."
      trigger={
        <button className="flex items-center justify-between w-full gap-2 cursor-pointer">
          <div className="flex items-center gap-3 font-semibold">
            <Image
              src={`/assets/flags/${selectedCountry.img}.png`}
              alt={`${selectedCountry.name} - ${selectedCountry.currency}`}
              width={25}
              height={23}
            />
            <h4 className="text-sm">
              {selectedCountry.name} - {selectedCountry.currency}
            </h4>
          </div>
          {isArabic ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </button>
      }
    >
      <CountrySelectorContent
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        closeHandler={() => setOpen(false)}
      />
    </CustomDialog>
  );
};

export default CountryDialog;
