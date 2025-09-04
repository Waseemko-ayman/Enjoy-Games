/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { FaqsFilterTypes } from '@/data';
import { FAQSDataType } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllFaqs = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const t = useTranslations();

  const handleFaqsFilter = (rows: any[], currentFilter: string) => {
    if (currentFilter === 'all') return rows;

    // Convert currentFilter to a number corresponding to is_ai_generated
    const filterMap: Record<string, number> = { generated: 1, manual: 0 };
    const filterValue = filterMap[currentFilter] ?? -1;

    return rows.filter((item) => item.is_ai_generated === filterValue);
  };

  return (
    <GenericAllTable<FAQSDataType>
      value={value}
      title={t('Dashboard.faqs.title')}
      description={t('Dashboard.faqs.manageFaqs')}
      apiEndpoint="faq/all"
      deleteEndpoint="faq/delete"
      createTabValue="createFaqs"
      placeholder={t('Inputs.placeHolders.searchFaq')}
      onTabChange={onTabChange}
      showEdit={false}
      customFilter={handleFaqsFilter}
      filterOptions={FaqsFilterTypes.map((item) => ({
        id: item.labelKey,
        label: t(`Dashboard.faqs.FaqsFilters.${item.labelKey}`),
      }))}
    />
  );
};

export default AllFaqs;
