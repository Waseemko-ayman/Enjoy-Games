'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { CouponProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations();

  return (
    <GenericAllTable<CouponProps>
      value={value}
      title={t('Dashboard.coupons.title')}
      description={t('Dashboard.coupons.manageProducts')}
      apiEndpoint="coupons"
      deleteEndpoint="coupon/delete"
      createTabValue="CreateCoupons"
      placeholder={t('Inputs.placeHolders.searchCopouns')}
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
      showEdit={false}
      deleteLocation={t('sidebar.coupons')}
    />
  );
};

export default AllCoupons;
