'use client';
import React from 'react';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Input from '@/components/atomic/Input';
import PurchasesFilterSelect from '../PurchasesFilterSelect';

interface DataTableHeaderProps {
  totalItems: number;
  filteredItems: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
  filter?: string;
  handleFilterChange?: (value: string) => void;
  filterOptions?: { id: string; label: string }[];
}

const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  totalItems,
  filteredItems,
  searchTerm,
  onSearchChange,
  placeholder,
  filter,
  handleFilterChange,
  filterOptions,
}) => {
  const pathname = usePathname();
  const showSearch = pathname !== '/en/dashboard/sliders';
  // const showFilter = pathname === '/en/dashboard/orders';
  const showFilter = (filterOptions ?? []).length > 0;

  return (
    <div className="px-6 py-4 border-b border-gray-200 flex items-center flex-col sm:flex-row justify-between gap-4">
      <div className="flex items-center gap-3">
        {showFilter && (
          <PurchasesFilterSelect
            value={filter}
            onChange={handleFilterChange}
            options={filterOptions}
          />
        )}
        <p className="text-sm text-gray-500">
          {filteredItems} من {totalItems} عنصرًا
        </p>
      </div>
      {showSearch && (
        <div className="relative">
          <Input
            type="text"
            variant="secondary"
            placeholder={placeholder}
            inputName="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            otherClassNameContainer="pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 transition-colors"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default DataTableHeader;
