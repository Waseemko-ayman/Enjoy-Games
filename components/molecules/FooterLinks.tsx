'use client';
import React from 'react';
import Link from 'next/link';
import FooterTitle from '../atomic/FooterTitle';
import { FOOTER_LINKS_DATA } from '@/data';
import Image from 'next/image';
import { FooterLinksProps } from '@/interfaces';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { useTranslations } from 'next-intl';

const FooterLinks = ({
  secTitle,
  listName,
  otherClassName,
  t,
}: FooterLinksProps) => {
  const { isArabic } = useToggleLocale();
  const ariaTxts = useTranslations('ariaLabels.links');
  return (
    <div className="flex flex-col">
      <FooterTitle title={secTitle} />
      <ul
        className={`${
          listName === 'socialMedia'
            ? 'flex items-center flex-wrap max-md:!justify-center gap-2'
            : listName === 'shop_app'
            ? 'flex flex-col max-md:!items-center'
            : ''
        }`}
      >
        {FOOTER_LINKS_DATA[listName].map((item, index) => {
          if (listName === 'shop_app') {
            return (
              <li key={item.id} className="mb-5">
                <AnimatedWrapper custom={index}>
                  {'src' in item ? (
                    <Link href={item.url} aria-label={ariaTxts(item.ariaLabel)}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={150}
                        height={150}
                        className="rounded-sm"
                      />
                    </Link>
                  ) : null}
                </AnimatedWrapper>
              </li>
            );
          } else {
            return (
              <li
                key={item.id}
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
                <AnimatedWrapper custom={index}>
                  <Link
                    href={item.url}
                    aria-label={
                      'ariaLabel' in item ? ariaTxts(item.ariaLabel) : undefined
                    }
                    className="block text-sm"
                  >
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
                </AnimatedWrapper>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default FooterLinks;
