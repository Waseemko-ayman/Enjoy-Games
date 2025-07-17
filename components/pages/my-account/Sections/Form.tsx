'use clinet';

import React, { useState } from 'react';
import Input from '@/components/atomic/Input';
import { inputData } from '@/data';
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), {
  ssr: false,
});
import 'react-phone-number-input/style.css';

const Form = () => {
  const [phone, setPhone] = useState<string | undefined>(undefined);

  return (
    <div>
      <h2 className="text-2xl font-medium text-gray-500 mb-4">
        معلومات الحساب
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {inputData.map((input) => (
          <div key={input.id} className="relative">
            {input.type === 'number' ? (
              <div>
                <label className="block text-right text-gray-700 font-normal text-sm mb-2">
                  رقم الجوال
                </label>
                <PhoneInput
                  international
                  defaultCountry="PS"
                  value={phone}
                  onChange={setPhone}
                  placeholder="xxxxxxxxx"
                  className="px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-5 focus:ring-[var(--enjoy-primary)]"
                />
              </div>
            ) : (
              <Input
                variant="secondary"
                type={input.type}
                label={input.label}
                placeholder={input?.placeholder}
                options={input?.options}
                Icon={input.icon}
                iconClassName="h-4 w-4 text-gray-400"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
