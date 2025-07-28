import RefundPolicyPage from '@/components/pages/refund-policy';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | سياسة الإسترجاع',
};

const RefundPolicy = () => <RefundPolicyPage />;

export default RefundPolicy;
