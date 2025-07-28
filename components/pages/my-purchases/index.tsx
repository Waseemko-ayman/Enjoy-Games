import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import PageHeader from '@/components/molecules/PageHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PATHS } from '@/data/paths';
import React from 'react';
import { MyPurchasesTypes } from '@/data';
import { useTranslations } from 'next-intl';

const MyPurchasesPage = () => {
  const t = useTranslations('MyPurchases');
  const ariaTxts = useTranslations('ariaLabels.btns');
  const btnTexts = useTranslations('BtnTexts');
  return (
    <div>
      <PageHeader>
        <Select>
          <SelectTrigger
            className="w-[180px]"
            aria-label={ariaTxts('selectPurchaseType')}
          >
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
      </PageHeader>
      <EmptyStateBox
        imageSrc="/assets/empty-status.png"
        alt="empty-status"
        title={t('ُemptyStateMsg')}
        buttonText={btnTexts('StartMarketingNow')}
        btnlink={PATHS.STORE.link}
      />
    </div>
  );
};

export default MyPurchasesPage;
