'use client';
import React, { useState } from 'react';
import NavItem from '../atomic/NavItem';
import { subMenuItems } from '@/data';
import { motion } from 'framer-motion';

const SheetContentComp = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {subMenuItems.map((item, index) => {
        const isOpen = openIndex === index;
        const hasSubmenu = !!item.submenu;
        const isLastTwoItems = index >= subMenuItems.length - 2;

        return (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={index}
          >
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
                className={`z-50 mt-2 border border-gray-100 rounded-xl shadow-lg bg-white scrollbar-none
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
          </motion.div>
        );
      })}
    </div>
  );
};

export default SheetContentComp;
