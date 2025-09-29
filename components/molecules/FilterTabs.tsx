import React from 'react';
import { Shield, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  stats: {
    total_count: number;
    pending_review: number;
    approved: number;
    blocked: number;
  };
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  stats,
}) => {
  const t = useTranslations('MyPurchases');

  const tabs = [
    {
      key: 'all',
      label: t('all'),
      count: stats.total_count,
      icon: Shield,
      color: 'text-gray-600',
    },
    {
      key: 'pending',
      label: t('pending'),
      count: stats.pending_review,
      icon: Clock,
      color: 'text-blue-600',
    },
    {
      key: 'approved',
      label: t('approved'),
      count: stats.approved,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      key: 'blocked',
      label: t('blocked'),
      count: stats.blocked,
      icon: XCircle,
      color: 'text-red-600',
    },
  ];

  return (
    <div className="border-b border-gray-200 bg-white rounded-t-lg">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onFilterChange(tab.key)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? 'text-blue-600' : tab.color}`}
              />
              {tab.label}
              <span
                className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isActive
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
