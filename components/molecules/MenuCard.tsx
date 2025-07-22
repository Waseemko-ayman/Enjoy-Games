import { LinkItem, TranslationFunction } from '@/interfaces';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import { useToggleLocale } from '@/hook/useToggleLocale';

const MenuCard = ({
  linksList,
  t,
}: {
  linksList: LinkItem[];
  t: TranslationFunction;
}) => {
  const { isArabic } = useToggleLocale();
  return (
    <div className="py-3 px-5 bg-white rounded-[10px] shadow-[0_8.293px_37.319px_4.147px_rgba(0,0,0,0.08)] mb-4">
      <ul className="flex flex-col gap-3">
        {linksList.map((list, index) => {
          const Icon = list.icon;
          return (
            <AnimatedWrapper key={list.id} custom={index}>
              <li>
                <Link
                  href={list.link}
                  className="flex items-center justify-between gap-2"
                >
                  <h4 className="flex items-center gap-3 text-base font-normal">
                    <Icon />
                    {t(list.key)}
                  </h4>
                  {isArabic ? <IoIosArrowBack /> : <IoIosArrowForward />}
                </Link>
              </li>
            </AnimatedWrapper>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuCard;
