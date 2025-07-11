import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Button from '../atomic/Button';
import { FaX } from 'react-icons/fa6';
import ResponsiveDialogDrawer from './ResponsiveDialogDrawer';
import { PATHS } from '@/data/paths';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const TopBanner = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  const handleclick = () => {
    setTimeout(() => router.push(PATHS.STARS), 200);
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
      className="bg-enjoy-primary text-white text-center py-2 px-1 text-sm min-[425px]:text-lg font-bold relative"
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
              <span>🎉 !إشتري أكثر وإكسب الضعف وإستبدل نقاطك ببطاقات</span>
            </button>
          }
        >
          {/* Orange Hydrogen Added */}
          <div className="relative bg-enjoy-secondary-light text-white h-80 rounded-t-3xl flex items-start justify-center overflow-hidden">
            <Image
              src="/assets/phone.png"
              alt="phone"
              width={300}
              height={300}
            />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>
          <div className="p-6 pt-0">
            <Button
              variant="forth"
              handleClick={() => setOpen(false)}
              otherClassName={`absolute ${
                isMobile ? 'top-9 left-5 w-7 h-7' : 'top-6 left-5 w-6 h-6'
              } shadow-sm`}
            >
              <FaX className="w-3 h-3 text-gray-600" />
            </Button>

            {/* To Review */}
            {/* <div className="relative max-h-64 overflow-hidden">
              <Image
                src="/assets/phone.png"
                alt="phone"
                width={300}
                height={300}
                className="relative z-10 mx-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div> */}

            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mt-4 mb-3">
                إنجوي قيمز من إنجوي قيمز
              </h2>
              <h3 className="text-3xl font-bold text-enjoy-primary mb-3">
                اشتري أكثر واكسب الضعف واستبدل نقاطك ببطاقات!
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-3">
                إنجوي قيمز هو نظام ولاء يمنحك نقاطًا عند كل عملية شراء، والتي
                يمكنك استبدالها ببطاقات رقمية أو تحويلها إلى رصيد في محفظتك.
              </p>
            </div>

            <Button otherClassName="w-full p-2.5" handleClick={handleclick}>
              اكتشفه الآن!
            </Button>
          </div>
        </ResponsiveDialogDrawer>

        <span className="text-sm text-[var(--enjoy-primary-deep)] bg-[var(--enjoy-lime-yellow)] rounded-4xl px-1.5 order-1 sm:order-2">
          جديد
        </span>
      </div>
    </div>
  );
};

export default TopBanner;
