import { LinkItem } from '@/interfaces';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';

const MenuCard = ({ linksList }: { linksList: LinkItem[] }) => {
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
                    {list.title}
                  </h4>
                  <IoIosArrowBack />
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
