import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

interface PurchasesFilterSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: { id: string; label: string }[]; // جديد
  ariaLabelKey?: string;
  className?: string;
}

const PurchasesFilterSelect: React.FC<PurchasesFilterSelectProps> = ({
  value,
  onChange,
  options,
  ariaLabelKey = 'selectPurchaseType',
  className = 'w-[180px]',
}) => {
  const ariaTxts = useTranslations('ariaLabels.btns');

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={className} aria-label={ariaTxts(ariaLabelKey)}>
        <SelectValue placeholder="الكل" />
      </SelectTrigger>
      <SelectContent>
        {options?.map((item) => (
          <SelectItem
            key={item.id}
            value={item.id}
            className="hover:bg-[#f4f4ff] hover:text-enjoy-primary"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PurchasesFilterSelect;
