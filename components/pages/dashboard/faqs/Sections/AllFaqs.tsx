'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { FAQSDataType } from '@/interfaces';
import React from 'react';

const AllFaqs = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  return (
    <GenericAllTable<FAQSDataType>
      value={value}
      title="جميع الكوبونات"
      description="إدارة جميع الكوبونات في مكان واحد"
      apiEndpoint="faqs"
      deleteEndpoint="faq/delete"
      createTabValue="createFaqs"
      onTabChange={onTabChange}
      showEdit={false}
    />
  );
};

export default AllFaqs;
