'use client';
import React from 'react';
import AllCodes from './Sections/AllCodes';
import CreateCodes from './Sections/CreateCodes';
import GenericPage from '@/components/organism/GenericPage';

const tabsData = [
  { value: 'AllCodes', label: 'جميع الأكواد' },
  { value: 'CreateCodes', label: 'إنشاء كود' },
];

const CodesPage = () => {
  return (
    <GenericPage
      title="جميع الأكواد"
      description="قم بإنشاء وإدارة الأكواد لمتجرك"
      tabs={tabsData}
      allComponent={AllCodes}
      createComponent={CreateCodes}
    />
  );
};

export default CodesPage;
