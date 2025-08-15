'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { useProductCodes } from '@/context/selectedProductId';
import { CodesResponse } from '@/interfaces';
import React from 'react';

const AllCodes = ({
  value,
  onTabChange,
  onEditIdChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
  onEditIdChange: (id: string | number | null) => void;
}) => {
  const { selectedProductId } = useProductCodes();

  return (
    <GenericAllTable<CodesResponse>
      value={value}
      title="جميع الأكواد"
      description="إدارة جميع الأكواد في مكان واحد"
      apiEndpoint={`product/${selectedProductId}/codes`}
      deleteEndpoint="code/delete"
      placeholder="البحث عن الأكواد..."
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
      createTabValue="CreateCodes"
    />
  );
};

export default AllCodes;
