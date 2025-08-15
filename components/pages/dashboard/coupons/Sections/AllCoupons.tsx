'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { CouponProps } from '@/interfaces';
import React from 'react';

const AllCoupons = ({
  value,
  onTabChange,
  onEditIdChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
  onEditIdChange: (id: string | number | null) => void;
}) => {
  return (
    <GenericAllTable<CouponProps>
      value={value}
      title="جميع الكوبونات"
      description="إدارة جميع الكوبونات في مكان واحد"
      apiEndpoint="coupons"
      deleteEndpoint="coupon/delete"
      createTabValue="CreateCoupons"
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
      showEdit={false}
    />
  );
};

export default AllCoupons;
