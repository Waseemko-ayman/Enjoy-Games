import { LinkItem } from '@/interfaces';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const MenuCard = ({ linksList }: { linksList: LinkItem[] }) => {
  return (
    <div className="py-3 px-5 bg-white rounded-[10px] shadow-[0_8.293px_37.319px_4.147px_rgba(0,0,0,0.08)] mb-4">
      <ul className="flex flex-col gap-3">
        {linksList.map((list) => (
          <li key={list.id}>
            <Link
              href={list.link}
              className="flex items-center justify-between gap-2"
            >
              <h4 className="flex items-center gap-3 text-lg font-normal">
                <list.icon />
                {list.title}
              </h4>
              <IoIosArrowBack />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuCard;
