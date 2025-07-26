import { useToggleLocale } from '@/hook/useToggleLocale';
import { NavItemProps } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const NavItem: React.FC<NavItemProps> = ({
  icon,
  name,
  linkPath = '#',
  otherClassName,
  otherClassNameIcon,
  showArrow = false,
  onClick,
  layout,
  isMobile,
}) => {
  const { isArabic } = useToggleLocale();

  const showIcon = (icon: React.ElementType) => {
    const Icon = icon;
    return (
      <Icon
        className={`text-lg text-[var(--enjoy-primary)] ${
          isMobile ? 'max-md:text-primary' : 'max-md:text-white'
        } ${otherClassNameIcon}`}
      />
    );
  };
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
        max-md:!py-3
        max-md:!pl-0
        max-md:!pr-1
        max-md:hover:bg-[#f4f4ff]
        max-md:hover:!text-[var(--enjoy-primary)]
        max-md:rounded-lg
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
        {typeof icon === 'string' ? (
          <Image
            src={icon}
            alt={name}
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
            {icon && showIcon(icon)}
          </div>
        )}
        <span>{name}</span>
      </div>

      {showArrow ? (
        isArabic ? (
          <IoIosArrowBack className="text-2xl" />
        ) : (
          <IoIosArrowForward className="text-2xl" />
        )
      ) : null}
    </Link>
  );
};

export default NavItem;
