import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Button from '../atomic/Button';
import { FaX } from 'react-icons/fa6';
import ResponsiveDialogDrawer from './ResponsiveDialogDrawer';
import Link from 'next/link';
import { PATHS } from '@/data/paths';

const TopBanner = () => {
  const [open, setOpen] = useState(false);

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
          trigger={
            <button className="flex items-center gap-2 order-2 sm:order-1 cursor-pointer">
              <IoIosArrowBack />
              <span>🎉 !إشتري أكثر وإكسب الضعف وإستبدل نقاطك ببطاقات</span>
            </button>
          }
        >
          {/* Orange Hydrogen Added */}
          <div className="bg-enjoy-secondary-light text-white h-80 rounded-t-3xl"></div>
          <div className="p-6">
            <Button
              variant="forth"
              handleClick={() => setOpen(false)}
              otherClassName="absolute top-6 left-6 w-6 h-6 shadow-sm"
            >
              <FaX className="w-3 h-3 text-gray-600" />
            </Button>

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

            <Link href={PATHS.STARS} className="w-full ">
              <Button otherClassName="p-2.5">اكتشفه الآن!</Button>
            </Link>
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
