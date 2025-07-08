import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

interface NavItemProps {
  Icon: React.ElementType | string;
  text: string;
  linkPath?: string;
  otherClassName?: string;
  otherClassNameIcon?: string;
  showArrow?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  Icon,
  text,
  linkPath = '#',
  otherClassName,
  otherClassNameIcon,
  showArrow = false,
  onClick,
}) => {
  return (
    <Link
      href={linkPath}
      onClick={onClick}
      className={`
        w-full flex items-center justify-between gap-2
        text-xl font-semibold
        rounded-md
        transition cursor-pointer
        px-[36px] py-[19px]
        hover:text-[var(--daleel-primary)]
        max-[991px]:!py-3
        max-[991px]:!pl-0
        max-[991px]:!pr-1
        max-[991px]:hover:bg-[#f4f4ff]
        max-[991px]:hover:!text-[var(--daleel-primary)]
        max-[991px]:rounded-lg

        ${otherClassName}
      `}
    >
      <div className="flex items-center gap-2">
        {typeof Icon === 'string' ? (
          <Image
            src={`/assets/${Icon}`}
            alt={text}
            className={`object-contain rounded-[50%] ${otherClassNameIcon}`}
            width={26}
            height={26}
          />
        ) : (
          <Icon
            className={`text-xl text-[var(--daleel-primary)] max-[991px]:text-white ${otherClassNameIcon}`}
          />
        )}
        <span>{text}</span>
      </div>

      {showArrow && <IoIosArrowBack className="text-2xl" />}
    </Link>
  );
};

export default NavItem;
