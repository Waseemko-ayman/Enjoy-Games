'use client';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToggleLocale } from '@/hook/useToggleLocale';

interface Tab {
  value: string;
  label: string;
}

interface TabsNavigationProps {
  tabs: Tab[];
  variant?: 'default' | 'segmented';
  children?: React.ReactNode;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({
  tabs,
  variant = 'default',
  children,
}) => {
  const { isArabic } = useToggleLocale();

  const columnsClass = `grid w-full ${
    tabs.length === 2
      ? 'grid-cols-2'
      : tabs.length === 3
      ? 'grid-cols-3'
      : tabs.length === 4
      ? 'grid-cols-4'
      : tabs.length === 5
      ? 'grid-cols-5'
      : 'grid-cols-1'
  }`;

  const tabsList = (
    <TabsList
      className={`${variant === 'default' ? columnsClass : ''}`}
      variant="classic"
    >
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className={`${isArabic ? 'text-base font-normal' : 'text-sm'} ${
            variant === 'segmented' ? 'rounded-lg px-4 py-2' : ''
          }`}
          variant="classic"
        >
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );

  return variant === 'segmented' || children ? (
    <div className="flex items-center justify-between overflow-auto pb-2">
      {tabsList}
      {children}
    </div>
  ) : (
    tabsList
  );
};
export default TabsNavigation;
