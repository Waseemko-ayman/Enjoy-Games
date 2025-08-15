'use client';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import CountryDrawer from '@/components/molecules/CountryDrawer';
import MenuCard from '@/components/molecules/MenuCard';
import { countries, menuLists } from '@/data';
import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa6';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '@/context/AuthContext';

const MenuLists = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [open, setOpen] = useState(false);
  const { isArabic, toggleLocale } = useToggleLocale();
  const t = useTranslations('Layout.header.navBarPopup');
  const langTexts = useTranslations('Languages');
  const titleTxts = useTranslations('PagesHeaderTitles');
  const { token } = useAuthContext();

  return (
    <div className="mt-4">
      {menuLists.map((card, index) => {
        const filteredLinks = card.linksItem.filter((link) => {
          if (link.key === 'dashboard' && !token) {
            return false;
          }
          return true;
        });

        return (
          <AnimatedWrapper key={card.id} custom={index}>
            <MenuCard linksList={filteredLinks} t={titleTxts} />
          </AnimatedWrapper>
        );
      })}

      <div className="flex flex-col gap-3 py-3 px-5 bg-white rounded-[10px] shadow-[0_8.293px_37.319px_4.147px_rgba(0,0,0,0.08)] mb-4">
        <AnimatedWrapper>
          <div
            className="flex items-center justify-between gap-1 w-full"
            onClick={toggleLocale}
          >
            <div className="flex items-center gap-3">
              <FaGlobe />
              <span className="text-base cursor-pointer">
                {t('ChangeTheLanguage')}
              </span>
            </div>
            <h4 className="text-[15px] font-normal">
              {isArabic ? langTexts('english') : langTexts('arabic')}
            </h4>
          </div>
        </AnimatedWrapper>
        <CountryDrawer
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          open={open}
          setOpen={setOpen}
          t={t}
          isArabic={isArabic}
        />
      </div>
    </div>
  );
};

export default MenuLists;
