import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import ResponsiveDialogDrawer from './ResponsiveDialogDrawer';
import { PATHS } from '@/data/paths';
import { useRouter } from 'next/navigation';
import TopBannerDrawerContent from '../molecules/TopBannerDrawerContent';

const TopBanner = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  const handleclick = () => {
    setTimeout(() => router.push(PATHS.STARS.link), 200);
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="bg-enjoy-primary text-white text-center py-3 px-1 text-sm min-[425px]:text-lg font-bold relative"
      dir="ltr"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <ResponsiveDialogDrawer
          contentClassName="p-0"
          open={open}
          setOpen={setOpen}
          isMobile={isMobile}
          trigger={
            <button className="flex items-center gap-2 order-2 sm:order-1 cursor-pointer">
              <IoIosArrowBack />
              <span className="text-sm">
                🎉 !إشتري أكثر وإكسب الضعف وإستبدل نقاطك ببطاقات
              </span>
            </button>
          }
        >
          <TopBannerDrawerContent
            isMobile={isMobile}
            onClose={() => setOpen(false)}
            onDiscover={handleclick}
          />
        </ResponsiveDialogDrawer>

        <span className="text-[12px] text-[var(--enjoy-primary-deep)] bg-[var(--enjoy-lime-yellow)] rounded-4xl px-1.5 order-1 sm:order-2">
          جديد
        </span>
      </div>
    </div>
  );
};

export default TopBanner;
