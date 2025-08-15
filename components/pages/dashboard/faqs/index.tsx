import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllFaqs from './Sections/AllFaqs';
import CreateFaqs from './Sections/CreateFaqs';

const tabsData = [
  { value: 'allFaqs', label: 'جميع الأسئلة الشائعة' },
  { value: 'createFaqs', label: 'إنشاء سؤال' },
];

const FaqsPage = () => {
  return (
    <GenericPage
      title="جميع الأسئلة الشائعة"
      description="قم بإنشاء وإدارة الأسئلة لمتجرك"
      tabs={tabsData}
      allComponent={AllFaqs}
      createComponent={CreateFaqs}
    />
  );
};

export default FaqsPage;
