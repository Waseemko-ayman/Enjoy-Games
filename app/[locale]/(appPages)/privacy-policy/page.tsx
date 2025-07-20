import PrivacyPolicyPage from '@/components/pages/privacy-policy';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | سياسة الخصوصية',
};

const PrivacyPolicy = () => <PrivacyPolicyPage />;

export default PrivacyPolicy;
