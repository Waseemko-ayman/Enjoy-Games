import React from 'react';
import NavItem from '@/components/atomic/NavItem';
import { DropdownNavItemProps } from '@/interfaces';

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
              <NavItem
                key={index}
                Icon={item.Icon}
                text={item.label}
                otherClassName="!px-2 !py-3 !text-base hover:bg-[#f4f4ff] rounded-lg text-lg"
                showArrow={!!item.submenu}
                linkPath={item.path}
              />

              {item.submenu && (
                <div
                  className={`absolute right-full top-0 ml-2 border border-gray-100 rounded-xl shadow-lg bg-white transition-all duration-200 ease-out
                  ${
                    item.submenu.length > 3
                      ? 'invisible opacity-0 pointer-events-none group-hover/sub:visible group-hover/sub:opacity-100 group-hover/sub:pointer-events-auto w-[800px] p-3 grid grid-cols-4 gap-1'
                      : 'hidden group-hover/sub:block w-[240px] py-2 pr-3 pl-2'
                  }`}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <NavItem
                      key={subIndex}
                      Icon={subItem.Icon}
                      text={subItem.label}
                      otherClassName="!py-2 !px-0 !text-base !font-medium"
                    />
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
