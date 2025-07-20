'use client';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import CountryDrawer from '@/components/molecules/CountryDrawer';
import MenuCard from '@/components/molecules/MenuCard';
import { countries, menuLists } from '@/data';
import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa6';

const MenuLists = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      {menuLists.map((card, index) => (
        <AnimatedWrapper key={card.id} custom={index}>
          <MenuCard linksList={card.linksItem} />
        </AnimatedWrapper>
      ))}
      <div className="flex flex-col items-start gap-3 py-3 px-5 bg-white rounded-[10px] shadow-[0_8.293px_37.319px_4.147px_rgba(0,0,0,0.08)] mb-4">
        <AnimatedWrapper>
          <div className="flex items-center justify-between gap-1 w-full">
            <div className="flex items-center gap-3">
              <FaGlobe />
              <button className="text-base cursor-pointer">غير اللغة</button>
            </div>
            <h4 className="text-[15px] font-normal">English</h4>
          </div>
        </AnimatedWrapper>
        <CountryDrawer
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default MenuLists;
