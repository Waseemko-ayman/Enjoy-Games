'use client';

import { FormValues } from '@/interfaces';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6';

const options = [
  'إرسال كود البطاقة إلى البريد الإلكتروني',
  'أعرف جديدا من تحديثات وإضافات.',
  'المناسبات والأعياد (قد تتضمن خدمات حصرية لمستلمها)',
  'الاهتمال الذي معرفة ما يهمك وما قد تحتاجه.',
];

const AccountOptions = () => {
  const { setValue, watch } = useFormContext<FormValues>();
  const checked = watch('options') || Array(options.length).fill(false);

  const handleChange = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setValue('options', updated);
  };

  return (
    <div>
      <h3 className="text-2xl font-medium text-gray-500 mb-7">خيارات الحساب</h3>

      <ul className="space-y-3">
        {options.map((text, index) => (
          <li key={index} className="flex items-center gap-3">
            <label className="flex items-center cursor-pointer select-none gap-3">
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => handleChange(index)}
                className="peer sr-only"
              />
              <div className="w-6 h-6 rounded-lg border border-gray-300 peer-checked:bg-green-600 flex items-center justify-center transition-colors">
                {checked[index] && <FaCheck className="w-3 h-3 text-white" />}
              </div>
              <span
                className={`text-sm transition-colors ${
                  checked[index] ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountOptions;
