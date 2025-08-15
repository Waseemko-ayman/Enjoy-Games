'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { CategoryResponse } from '@/interfaces';
import React from 'react';

const AllCategories = ({
  value,
  onTabChange,
  onEditIdChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
  onEditIdChange: (id: string | number | null) => void;
}) => {
  return (
    <GenericAllTable<CategoryResponse>
      value={value}
      title="جميع الأقسام"
      description="إدارة جميع فئاتك في مكان واحد"
      apiEndpoint="categories"
      deleteEndpoint="category/delete"
      placeholder="البحث عن الفئات..."
      createTabValue="createCategory"
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
    />
  );
};

export default AllCategories;
