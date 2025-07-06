import React from 'react';
import NavItem from '@/components/atomic/NavItem';
import { IoIosArrowBack } from 'react-icons/io';

interface SubMenuItem {
  label: string;
  Icon: React.ElementType;
  submenu?: SubMenuItem[];
}

interface DropdownNavItemProps {
  text: string;
  Icon: React.ElementType;
  submenu?: SubMenuItem[];
  isMainMenu?: boolean;
}

const DropdownNavItem: React.FC<DropdownNavItemProps> = ({
  text,
  Icon,
  submenu,
  isMainMenu = false,
}) => {
  return (
    <div className="relative group">
      <NavItem Icon={Icon} text={text} />

      {submenu && (
        <div
          className={`
          absolute top-full right-6 z-50 hidden group-hover:block bg-white py-2 pr-1 pl-2 rounded-xl shadow-lg border border-gray-100
          ${isMainMenu ? 'w-[200px]' : 'w-[240px]'}
          transition-all duration-200 ease-out
        `}
        >
          {submenu.map((item, index) => (
            <div key={index} className="relative group/sub">
              <div
                key={index}
                className="flex items-center justify-between hover:bg-[#f4f4ff] px-2 py-3 rounded-lg text-lg font-medium cursor-pointer transition"
              >
                <NavItem
                  Icon={item.Icon}
                  text={item.label}
                  otherClassName="!py-0 !px-0 !text-base"
                />
                <IoIosArrowBack className="text-2xl" />
              </div>

              {item.submenu && (
                <div
                  className={`absolute right-full top-0 ml-2 border border-gray-100 rounded-xl shadow-lg bg-white transition-all duration-200 ease-out
                  ${
                    item.submenu.length > 3
                      ? 'invisible opacity-0 pointer-events-none group-hover/sub:visible group-hover/sub:opacity-100 group-hover/sub:pointer-events-auto w-[800px] p-3 grid grid-cols-4 gap-2'
                      : 'hidden group-hover/sub:block w-[240px] py-2 pr-1 pl-2'
                  }`}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center justify-between hover:text-[var(--daleel-primary)] px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition"
                    >
                      <NavItem
                        Icon={subItem.Icon}
                        text={subItem.label}
                        otherClassName="!py-0 !px-0 !text-base"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownNavItem;
