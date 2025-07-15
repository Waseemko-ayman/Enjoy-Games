'use client';

import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), {
  ssr: false,
});
import AuthLayout from '@/components/organism/AuthLayout';

const LoginPage = () => {
  const [phone, setPhone] = useState<string | undefined>(undefined);

  return (
    <AuthLayout
      title="أيش رقم جوالك؟"
      description="أنشئ حسابًا أو سجّل دخولك بحسابك المسجّل في إنجوي قيمز"
      btnText="التالي"
    >
      <div className="mb-6 w-full">
        <label className="block text-right text-gray-700 font-normal text-sm mb-2">
          رقم الجوال
        </label>
        <PhoneInput
          international
          defaultCountry="PS"
          value={phone}
          onChange={setPhone}
          placeholder="xxxxxxxxx"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
