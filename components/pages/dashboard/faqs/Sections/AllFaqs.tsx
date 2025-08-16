'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
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

  return (
    <GenericAllTable<FAQSDataType>
      value={value}
      title={t('Dashboard.faqs.title')}
      description={t('Dashboard.faqs.manageFaqs')}
      apiEndpoint="faqs"
      deleteEndpoint="faq/delete"
      createTabValue="createFaqs"
      placeholder={t('Inputs.placeHolders.searchFaq')}
      onTabChange={onTabChange}
      showEdit={false}
    />
  );
};

export default AllFaqs;
