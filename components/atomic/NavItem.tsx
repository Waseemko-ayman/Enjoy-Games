import { NavItemProps } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const NavItem: React.FC<NavItemProps> = ({
  Icon,
  text,
  linkPath = '#',
  otherClassName,
  otherClassNameIcon,
  showArrow = false,
  onClick,
  layout,
  isMobile,
}) => {
  return (
    <Link
      href={linkPath}
      onClick={onClick}
      className={`
        flex
        items-center
        gap-2
        font-semibold
        rounded-md
        transition cursor-pointer
        py-[19px]
        hover:text-[var(--enjoy-primary)]
        max-[991px]:!py-3
        max-[991px]:!pl-0
        max-[991px]:!pr-1
        max-[991px]:hover:bg-[#f4f4ff]
        max-[991px]:hover:!text-[var(--enjoy-primary)]
        max-[991px]:rounded-lg
        ${
          layout === 'store'
            ? isMobile
              ? 'px-2'
              : 'text-base'
            : 'w-full text-lg font-semibold justify-between px-[36px]'
        }
        ${otherClassName}
      `}
    >
      <div
        className={`flex items-center gap-2 ${
          layout === 'store' && isMobile ? 'flex-col' : ''
        }`}
      >
        {typeof Icon === 'string' ? (
          <Image
            src={`/assets/${Icon}`}
            alt={text}
            className={`object-contain rounded-[50%] ${otherClassNameIcon}`}
            width={26}
            height={26}
          />
        ) : (
          <div
            className={
              isMobile
                ? 'flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[var(--enjoy-gray-300)]'
                : ''
            }
          >
            <Icon
              className={`text-lg text-[var(--enjoy-primary)] ${
                isMobile ? 'max-[991px]:text-primary' : 'max-[991px]:text-white'
              } ${otherClassNameIcon}`}
            />
          </div>
        )}
        <span>{text}</span>
      </div>

      {showArrow && <IoIosArrowBack className="text-2xl" />}
    </Link>
  );
};

export default NavItem;
