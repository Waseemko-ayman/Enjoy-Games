'use client';
import React from 'react';
import Link from 'next/link';
import FooterTitle from '../atomic/FooterTitle';
import { FOOTER_LINKS_DATA } from '@/data';
import Image from 'next/image';
import { FooterLinksProps } from '@/interfaces';

const FooterLinks = ({
  secTitle,
  listName,
  otherClassName,
}: FooterLinksProps) => {
  return (
    <div className="flex flex-col">
      <FooterTitle title={secTitle} />
      <ul
        className={`${
          listName === 'socialMedia' ? 'flex items-center gap-2' : ''
        }`}
      >
        {FOOTER_LINKS_DATA[listName].map((item) => {
          if (listName === 'shop_app') {
            return (
              <li key={item.id} className="mb-5">
                <Link href={item.url}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={150}
                    height={150}
                    className="rounded-sm"
                  />
                </Link>
              </li>
            );
          } else {
            return (
              <li
                key={item.id}
                className={`group font-bold cursor-pointer rounded-lg ${
                  otherClassName ? otherClassName : ''
                } ${
                  listName !== 'socialMedia'
                    ? 'hover:pr-2 hover:bg-enjoy-gray-700 transition-all duration-400 w-[150px]'
                    : ''
                }`}
              >
                <Link href={item.url} target="_blank" className="block py-1.5">
                  {/* By type guard To check if an item is of a type that contains icon or text */}
                  {'icon' in item ? (
                    <div className="flex items-center justify-center bg-white rounded-sm p-2 cursor-pointer">
                      <item.icon className="text-enjoy-primary-deep group-hover:text-[var(--enjoy-primary)] transition-all duration-300" />
                    </div>
                  ) : (
                    item.text
                  )}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default FooterLinks;
