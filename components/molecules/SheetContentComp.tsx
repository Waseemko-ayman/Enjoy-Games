'use client';
import React, { useEffect, useState } from 'react';
import NavItem from '../atomic/NavItem';
import { motion } from 'framer-motion';
import useAPI from '@/hook/useAPI';
import { Category, SubCategories } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { API_IMAGE_URL } from '@/config/api';
import Loading from './loading';
import ErrorFetching from './ErrorFetching';
import NoDataMessage from '../organism/NoDataMessage';

const SheetContentComp = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();
  const {
    get,
    data: categories,
    isLoading,
    error,
  } = useAPI(`categories-subcategories`);

  const handleSubCategoryClick = (
    categorySlug: string,
    subCategory: SubCategories
  ) => {
    const basePath = `/categories/${categorySlug}/${subCategory.slug}`;
    setTimeout(() => router.push(basePath), 150);
    // const path =
    //   subCategory.children_count > 0
    //     ? `${basePath}/select-account`
    //     : `${basePath}/bundles`;
    // router.push(path);
  };

  useEffect(() => {
    get();
  }, [get]);

  return (
    <div>
      {isLoading ? (
        <Loading borderColor="border-white" />
      ) : error ? (
        <ErrorFetching />
      ) : categories?.length === 0 ? (
        <NoDataMessage />
      ) : (
        <div
          className={
            categories?.length > 8
              ? 'relative max-h-[calc(100vh-170px)] overflow-y-auto pr-2 scrollbar-none'
              : ''
          }
        >
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
                  icon={`${API_IMAGE_URL}${item.icon}`}
                  name={
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/categories/${item.slug}`);
                      }}
                    >
                      {item.name}
                    </span>
                  }
                  otherClassName="text-white !text-base"
                  showArrow
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
                        icon={`${API_IMAGE_URL}${subItem.icon}`}
                        name={subItem.name}
                        otherClassName="!py-2 !px-0 !text-base !font-medium"
                        onClick={() =>
                          handleSubCategoryClick(subItem.slug, subItem)
                        }
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SheetContentComp;
