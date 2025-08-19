import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { MyPurchasesTypes } from '@/data';

interface PurchasesFilterSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  ariaLabelKey?: string;
  className?: string;
}

const PurchasesFilterSelect: React.FC<PurchasesFilterSelectProps> = ({
  value,
  onChange,
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
        {MyPurchasesTypes.map((item) => (
          <SelectItem
            key={item.id}
            value={item.labelKey}
            className="hover:bg-[#f4f4ff] hover:text-enjoy-primary"
          >
            {t(item.labelKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PurchasesFilterSelect;
