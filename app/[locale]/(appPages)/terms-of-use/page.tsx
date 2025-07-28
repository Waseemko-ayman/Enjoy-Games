import TermsOfUsePage from '@/components/pages/terms-of-use';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | سياسة الإستخدام',
};

const TermsOfUse = () => <TermsOfUsePage />;

export default TermsOfUse;
