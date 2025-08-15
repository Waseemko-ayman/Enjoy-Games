'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { SubCategories } from '@/interfaces';
import React from 'react';

const AllSubCategories = ({
  value,
  onTabChange,
  onEditIdChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
  onEditIdChange: (id: string | number | null) => void;
}) => {
  return (
    <GenericAllTable<SubCategories>
      value={value}
      title="جميع الأقسام الفرعية"
      description="إدارة جميع الأقسام الفرعية في مكان واحد"
      apiEndpoint="sub-categories"
      deleteEndpoint="sub-category/delete"
      placeholder="البحث عن الفئات الفرعية..."
      createTabValue="createSubCategory"
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
    />
  );
};

export default AllSubCategories;
