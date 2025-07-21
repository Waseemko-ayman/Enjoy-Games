'use client';
import React from 'react';
import ContactInfo from './ContactInfo';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';
import { contactData } from '@/data';

const HelpSection = () => {
  const t = useTranslations('Layout.HelpSection');

  return (
    <section className="bg-white p-6 max-[425px]:px-3 rounded-2xl shadow-[0_4px_20.3px_13px_rgba(0,0,0,0.06)] flex items-center justify-center max-[991px]:flex-col gap-24 max-[991px]:gap-5 overflow-hidden">
      <h3 className="text-lg font-semibold">{t('title')}</h3>
      <div className="flex items-center justify-center gap-20 max-md:flex-col max-md:w-full max-md:gap-6 max-md:items-start">
        {contactData.map((item, index) => (
          <AnimatedWrapper key={item.id} custom={index}>
            <ContactInfo
              id={item.id}
              label={t(item.label)}
              email={item.email}
              Icon={item.icon}
            />
          </AnimatedWrapper>
        ))}
      </div>
    </section>
  );
};

export default HelpSection;
