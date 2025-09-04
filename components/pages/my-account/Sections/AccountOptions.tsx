'use client';

import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import FormField from '@/components/ui/FormField';
import { accountOptions } from '@/data';
import { FormValues, TranslationFunction } from '@/interfaces';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const AccountOptions = ({ t }: { t: TranslationFunction }) => {
  const { setValue, watch } = useFormContext<FormValues>();
  const checked = watch('options') || Array(AccountOptions.length).fill(false);

  const handleChange = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setValue('options', updated);
    console.log(updated);
  };

  return (
    <div>
      <AnimatedWrapper>
        <h3 className="text-2xl font-medium text-gray-500 mb-7">
          {t('AccountOptions')}
        </h3>
      </AnimatedWrapper>

      <ul className="space-y-3">
        {accountOptions.map((text, index) => {
          return (
            <AnimatedWrapper key={index} custom={index}>
              <li className="flex items-center gap-3">
                <FormField
                  key={index}
                  inputName={`options[${index}]`}
                  type="checkbox"
                  placeholder={t(text)}
                  // checked={checked[index]}
                  handleChange={() => handleChange(index)}
                  // register={register}
                />
              </li>
            </AnimatedWrapper>
          );
        })}
      </ul>
    </div>
  );
};

export default AccountOptions;
