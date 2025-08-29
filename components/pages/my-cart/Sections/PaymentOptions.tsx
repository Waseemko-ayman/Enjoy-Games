'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import CardWrapper from '@/components/atomic/CardWrapper';
import Button from '@/components/atomic/Button';
import Input from '@/components/atomic/Input';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import {
  PaymentFormData,
  PaymentMethod,
  TranslationFunction,
} from '@/interfaces';
import useAPI from '@/hook/useAPI';

type PaymentOptionsProps = {
  register: UseFormRegister<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
  onApplyCoupon: () => void;
  isLoading: boolean;
  orderIsLoading: boolean;
  btnTexts: TranslationFunction;
  inputsTexts: TranslationFunction;
  t: TranslationFunction;
};

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  register,
  errors,
  onApplyCoupon,
  isLoading,
  orderIsLoading,
  btnTexts,
  inputsTexts,
  t,
}) => {
  const { get, data: methods } = useAPI('payment-methods');

  useEffect(() => {
    get();
  }, [get]);

  return (
    <div className="lg:col-span-2 space-y-6">
      <MotionSection index={0}>
        {methods?.map((method: PaymentMethod) => (
          <label key={method.value}>
            <CardWrapper
              className={`p-6 cursor-pointer mb-4 ${
                errors.paymentMethod ? 'border border-red-500' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <input
                  type="radio"
                  value={method.value}
                  {...register('paymentMethod')}
                  className="w-4 h-4 text-enjoy-primary"
                />
                <div className="flex items-center gap-3">
                  <Image
                    src={method.image}
                    alt={method.label}
                    width={70}
                    height={70}
                  />
                  <span className="font-medium">{method.label}</span>
                </div>
              </div>
            </CardWrapper>
          </label>
        ))}
        {errors.paymentMethod && (
          <p className="text-red-500 text-sm mt-2">
            {errors.paymentMethod.message}
          </p>
        )}
      </MotionSection>

      <MotionSection index={1}>
        <CardWrapper className="p-6 mt-5">
          <h3 className="text-lg font-bold mb-4">{t('discountCoupon')}</h3>
          <div className="flex flex-row gap-3">
            <Input
              type="text"
              variant="secondary"
              placeholder={inputsTexts('placeHolders.haveCoupon')}
              otherClassNameContainer="sm:flex-1 focus:ring-2 focus:ring-purple-500"
              inputName="couponCode"
              {...register('couponCode')}
            />
            <Button
              type="button"
              variant="secondary"
              otherClassName="p-3 sm:px-6 max-sm:w-full rounded-lg max-sm:flex-1"
              handleClick={onApplyCoupon}
            >
              {isLoading ? <ButtonLoading /> : btnTexts('apply')}
            </Button>
          </div>
        </CardWrapper>
      </MotionSection>

      <MotionSection index={2}>
        <Button type="submit" otherClassName="w-full py-3">
          {orderIsLoading ? <ButtonLoading /> : btnTexts('Pay')}
        </Button>
      </MotionSection>
    </div>
  );
};

export default PaymentOptions;
