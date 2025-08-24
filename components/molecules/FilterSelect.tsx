/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

interface FilterSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: any[];
  ariaLabelKey?: string;
  className?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  options = [],
  ariaLabelKey = 'selectPurchaseType',
  className = 'w-[180px]',
}) => {
  const t = useTranslations('MyPurchases');
  const ariaTxts = useTranslations('ariaLabels.btns');

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={className} aria-label={ariaTxts(ariaLabelKey)}>
        <SelectValue placeholder={t('all')} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem
            key={item.id}
            value={item.value}
            className="hover:bg-[#f4f4ff] hover:text-enjoy-primary"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
