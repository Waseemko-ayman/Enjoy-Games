import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';
import CountrySelectorContent from './CountrySelectorContent';
import { Country } from '@/interfaces';
import CustomDialog from './CustomDialog';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Layout.header.navBarPopup');
  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      title={t('ChangeCountryCurrencyTitle')}
      description={t('ChangeCountryCurrencyDescription')}
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
              {t(`countries.${selectedCountry.img}.name`)} -{' '}
              {t(`countries.${selectedCountry.img}.currency`)}
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
        t={t}
      />
    </CustomDialog>
  );
};

export default CountryDialog;
