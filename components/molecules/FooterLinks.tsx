'use client';
import React from 'react';
import Link from 'next/link';
import FooterTitle from '../atomic/FooterTitle';
import { FOOTER_LINKS_DATA } from '@/data';
import Image from 'next/image';
import { FooterLinksProps } from '@/interfaces';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import { useToggleLocale } from '@/hook/useToggleLocale';

const FooterLinks = ({
  secTitle,
  listName,
  otherClassName,
  t,
}: FooterLinksProps) => {
  const { isArabic } = useToggleLocale();
  return (
    <div className="flex flex-col">
      <FooterTitle title={secTitle} />
      <ul
        className={`${
          listName === 'socialMedia'
            ? 'flex items-center max-md:!justify-center gap-2'
            : listName === 'shop_app'
            ? 'flex flex-col max-md:!items-center'
            : ''
        }`}
      >
        {FOOTER_LINKS_DATA[listName].map((item, index) => {
          if (listName === 'shop_app') {
            return (
              <AnimatedWrapper key={item.id} custom={index}>
                <li className="mb-5">
                  {'src' in item ? (
                    <Link href={item.url}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={150}
                        height={150}
                        className="rounded-sm"
                      />
                    </Link>
                  ) : null}
                </li>
              </AnimatedWrapper>
            );
          } else {
            return (
              <AnimatedWrapper key={item.id} custom={index}>
                <li
                  className={`group font-bold cursor-pointer rounded-lg py-2 ${
                    otherClassName ? otherClassName : ''
                  } ${
                    listName !== 'socialMedia'
                      ? `${
                          isArabic ? 'hover:pr-2' : 'hover:pl-2'
                        } hover:bg-[var(--enjoy-primary-deep-soft)] transition-all duration-400`
                      : ''
                  }`}
                >
                  <Link href={item.url} className="block text-sm">
                    {/* By type guard To check if an item is of a type that contains icon or text */}
                    {'icon' in item ? (
                      <div className="flex items-center justify-center bg-white rounded-sm p-2 cursor-pointer">
                        <item.icon
                          className="text-enjoy-primary-deep group-hover:text-[var(--enjoy-primary)] transition-all duration-300"
                          size={17}
                        />
                      </div>
                    ) : (
                      t(`${listName}.${'key' in item ? item.key : ''}`)
                    )}
                  </Link>
                </li>
              </AnimatedWrapper>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default FooterLinks;
