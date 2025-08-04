import { LinkItem, TranslationFunction } from '@/interfaces';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { useTickets } from '@/context/TicketsContext';
import { FaRegBell } from 'react-icons/fa6';

const MenuCard = ({
  linksList,
  t,
}: {
  linksList: LinkItem[];
  t: TranslationFunction;
}) => {
  const { isArabic } = useToggleLocale();
  const { tickets, hasUnreadTickets } = useTickets();
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
                    <div className="relative">
                      {list.key === 'tickets' &&
                      hasUnreadTickets &&
                      tickets &&
                      tickets.length > 0 ? (
                        <>
                          <FaRegBell />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </>
                      ) : (
                        <Icon />
                      )}
                    </div>
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
