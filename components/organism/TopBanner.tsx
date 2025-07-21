'use client';
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ResponsiveDialogDrawer from './ResponsiveDialogDrawer';
import { PATHS } from '@/data/paths';
import { useRouter } from 'next/navigation';
import TopBannerDrawerContent from '../molecules/TopBannerDrawerContent';
import useIsMobile from '@/hook/useIsMobile';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { useTranslations } from 'next-intl';

const TopBanner = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isArabic } = useToggleLocale();
  const t = useTranslations('Layout.header.topBanner');

  const router = useRouter();

  const handleclick = () => {
    setTimeout(() => router.push(PATHS.STARS.link), 200);
    setOpen(false);
  };

  return (
    <div className="overflow-hidden bg-enjoy-primary text-white text-center py-3 px-1 text-sm min-[425px]:text-lg font-bold relative">
      <AnimatedWrapper direction="x" distance={40}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="text-xs text-[var(--enjoy-primary-deep)] bg-[var(--enjoy-lime-yellow)] rounded-4xl px-1.5 order-2 sm:order-1">
            {t('new')}
          </span>
          <ResponsiveDialogDrawer
            contentClassName="p-0"
            open={open}
            setOpen={setOpen}
            isMobile={isMobile}
            trigger={
              <button className="flex items-center gap-2 order-2 sm:order-1 cursor-pointer">
                <span className="text-sm">{t('title')} 🎉</span>
                {isArabic ? <IoIosArrowBack /> : <IoIosArrowForward />}
              </button>
            }
          >
            <TopBannerDrawerContent
              isMobile={isMobile}
              onClose={() => setOpen(false)}
              onDiscover={handleclick}
            />
          </ResponsiveDialogDrawer>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default TopBanner;
