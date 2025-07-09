import React, { useState } from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { PiSquaresFourLight } from 'react-icons/pi';
import NavItem from '@/components/atomic/NavItem';
import { subMenuItems } from '@/data';

const NavbarSheet = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Sheet>
      <SheetTrigger>
        <PiSquaresFourLight className="text-3xl cursor-pointer text-enjoy-primary" />
      </SheetTrigger>
      <SheetContent className="pt-20">
        <SheetTitle className="sr-only">أقسام البطاقات</SheetTitle>
        <SheetDescription className="sr-only">
          هنا قائمة بأقسام البطاقات المتوفرة للتصفح والاختيار.
        </SheetDescription>
        <h4 className="text-white text-2xl font-semibold mb-5">
          أقسام البطاقات
        </h4>

        {subMenuItems.map((item, index) => {
          const isOpen = openIndex === index;
          const hasSubmenu = !!item.submenu;
          const isLastTwoItems = index >= subMenuItems.length - 2;

          return (
            <div key={index} className="relative">
              <NavItem
                key={index}
                Icon={item.Icon}
                text={item.label}
                otherClassName="text-white"
                showArrow={!!item.submenu}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              />

              {hasSubmenu && isOpen && (
                <div
                  className={`z-50 mt-2 border border-gray-100 rounded-xl shadow-lg bg-white 
                ${
                  item.submenu.length > 3
                    ? 'max-h-[300px] overflow-y-auto p-3 grid grid-cols-2 gap-2'
                    : 'p-2'
                }
                w-full
                ${
                  isLastTwoItems
                    ? 'lg:absolute lg:left-full lg:top-0 lg:ml-2 lg:w-[320px]'
                    : 'lg:absolute lg:right-full lg:top-0 lg:ml-2 lg:w-[320px]'
                }`}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <NavItem
                      key={subIndex}
                      Icon={subItem.Icon}
                      text={subItem.label}
                      otherClassName="!py-2 !px-0 !text-base !font-medium"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
