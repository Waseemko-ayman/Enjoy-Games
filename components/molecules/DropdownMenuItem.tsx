import React from 'react';
import NavItem from '@/components/atomic/NavItem';
import { DropdownNavItemProps } from '@/interfaces';
import { useToggleLocale } from '@/hook/useToggleLocale';

const DropdownNavItem: React.FC<DropdownNavItemProps> = ({
  name,
  icon,
  categories,
  isMainMenu = false,
}) => {
  const { isArabic } = useToggleLocale();
  return (
    <div className="relative group">
      <NavItem icon={icon} name={name} />

      {categories && (
        <div
          className={`
          absolute top-full right-6 z-50 hidden group-hover:block bg-white py-2 pr-1 pl-2 rounded-xl shadow-lg border border-gray-100
          ${isMainMenu ? 'w-[200px]' : 'w-[240px]'}
          transition-all duration-200 ease-out
        `}
        >
          {categories.map((category, index) => (
            <div key={index} className="relative group/sub">
              <NavItem
                key={index}
                icon={category.icon}
                name={category.name}
                otherClassName="!px-2 !py-3 !text-sm hover:bg-[#f4f4ff] rounded-lg"
                showArrow={!!category.sub_categories}
                linkPath={category.path}
              />

              {category.sub_categories && (
                <div
                  className={`absolute ${
                    isArabic ? 'right-full' : 'left-full'
                  } top-0 ml-2 border border-gray-100 rounded-xl shadow-lg bg-white transition-all duration-200 ease-out
                  ${
                    category.sub_categories.length > 3
                      ? 'invisible opacity-0 pointer-events-none group-hover/sub:visible group-hover/sub:opacity-100 group-hover/sub:pointer-events-auto w-[600px] grid grid-cols-4 gap-1 p-3'
                      : 'hidden group-hover/sub:block w-[240px] py-2 pr-3 pl-2'
                  }`}
                >
                  {category.sub_categories.map((subItem, index) => (
                    <NavItem
                      key={index}
                      icon={subItem.icon}
                      name={subItem.name}
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
