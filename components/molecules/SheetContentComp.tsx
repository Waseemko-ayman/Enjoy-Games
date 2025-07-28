/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import NavItem from '../atomic/NavItem';
import { motion } from 'framer-motion';
import useAPI from '@/hook/useAPI';
import { Category } from '@/interfaces';

const SheetContentComp = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { get, data: categories } = useAPI(`categories-subcategories`);

  useEffect(() => {
    get();
  }, []);

  return (
    <div>
      {categories.map((item: Category, index: number) => {
        const isOpen = openIndex === index;
        const hasSubmenu = !!item.sub_categories;
        const isLastTwoItems = index >= categories.length - 2;

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
              // icon={item.icon}
              icon={'/assets/digitalStores.webp'}
              name={item.name}
              otherClassName="text-white"
              showArrow={!!item.sub_categories}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            />

            {hasSubmenu && isOpen && (
              <div
                className={`z-50 mt-2 border border-gray-100 rounded-xl shadow-lg bg-white scrollbar-none
                ${
                  item.sub_categories.length > 3
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
                {item.sub_categories.map((subItem, index) => (
                  <NavItem
                    key={index}
                    // icon={subItem.icon}
                    icon={'/assets/digitalStores.webp'}
                    name={subItem.name}
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
