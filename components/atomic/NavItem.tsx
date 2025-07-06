import React from 'react';

interface NavItemProps {
  Icon: React.ElementType;
  text: string;
  onClick?: () => void;
  otherClassName?: string;
  otherClassNameIcon?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  Icon,
  text,
  onClick,
  otherClassName,
  otherClassNameIcon,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 text-xl font-semibold px-[36px] py-[19px] rounded-md hover:text-[var(--daleel-primary)] transition cursor-pointer ${otherClassName}`}
    >
      <Icon
        className={`text-[var(--daleel-primary)] text-xl ${otherClassNameIcon}`}
      />
      <span>{text}</span>
    </div>
  );
};

export default NavItem;
