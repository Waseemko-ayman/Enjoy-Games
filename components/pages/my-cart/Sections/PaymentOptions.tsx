'use client';
import React, { useEffect, useState } from 'react';
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
import Loading from '@/components/molecules/loading';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import ResponsiveDialogDrawer from '@/components/organism/ResponsiveDialogDrawer';
import useIsMobile from '@/hook/useIsMobile';
import { useTranslations } from 'next-intl';
import { FaX } from 'react-icons/fa6';

type PaymentOptionsProps = {
  register: UseFormRegister<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
  onApplyCoupon: () => void;
  isLoading: boolean;
  orderIsLoading: boolean;
  btnTexts: TranslationFunction;
  inputsTexts: TranslationFunction;
  t: TranslationFunction;
  setPaymentOptionValue: (value: number) => void;
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
  setPaymentOptionValue,
}) => {
  const isMobile = useIsMobile();
  const btnT = useTranslations('BtnTexts');

  const {
    get,
    data: methods,
    isLoading: methodLoading,
    error: methodError,
  } = useAPI('payment-methods');

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupOption, setPopupOption] = useState<'partial' | 'full'>();
  const [, setSelectedPayment] = useState<string | null>(null);

  const handlePopupOptionChange = (option: 'partial' | 'full') => {
    setPopupOption(option);
    setPaymentOptionValue(option === 'partial' ? 1 : 0);
  };

  useEffect(() => {
    get();
  }, [get]);

  return (
    <div className="lg:col-span-2 space-y-6">
      <MotionSection index={0}>
        {methodLoading ? (
          <Loading />
        ) : methodError ? (
          <ErrorFetching />
        ) : (
          methods?.map((method: PaymentMethod) => (
            <label key={method.value}>
              <CardWrapper
                className={`py-3 px-6 cursor-pointer mb-4 ${
                  errors.paymentMethod ? 'border border-red-500' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="radio"
                    value={method.value}
                    {...register('paymentMethod')}
                    className="w-4 h-4 text-enjoy-primary"
                    onChange={() => {
                      setSelectedPayment(method.value);
                      if (method.value !== 'wallet') setPopupOpen(true);
                    }}
                  />
                  <Image
                    src={method.image}
                    alt={method.label}
                    width={method.value === 'wallet' ? 50 : 70}
                    height={method.value === 'wallet' ? 50 : 70}
                  />
                </div>
              </CardWrapper>
            </label>
          ))
        )}
        {errors.paymentMethod && (
          <p className="text-red-500 text-sm mt-2">
            {errors.paymentMethod.message}
          </p>
        )}
      </MotionSection>

      <ResponsiveDialogDrawer
        open={popupOpen}
        setOpen={setPopupOpen}
        isMobile={isMobile}
        trigger={null}
      >
        <div className="flex items-center justify-between gap-2 mb-4 max-sm:mt-7">
          <h3 className="text-lg font-bold">{t('choosePayment')}</h3>
          <Button
            type="button"
            variant="forth"
            handleClick={() => setPopupOpen(false)}
            otherClassName="w-7 h-7 shadow-sm"
          >
            <FaX />
          </Button>
        </div>
        <div className="space-y-3">
          <label
            className={`flex items-center justify-between gap-10 cursor-pointer rounded-lg p-3 transition-colors ${
              popupOption === 'partial'
                ? 'bg-enjoy-glass'
                : 'bg-white text-black'
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{t('partialWallet')}</span>
              <p className="text-sm text-gray-600">{t('partialWalletDesc')}</p>
            </div>
            <input
              type="radio"
              name="paymentOption"
              value="partial"
              checked={popupOption === 'partial'}
              onChange={() => handlePopupOptionChange('partial')}
              className="mt-1 w-6 h-6"
            />
          </label>

          <label
            className={`flex items-center justify-between gap-10 cursor-pointer rounded-lg p-3 transition-colors ${
              popupOption === 'full' ? 'bg-enjoy-glass' : 'bg-white text-black'
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{t('fullCard')}</span>
              <p className="text-sm text-gray-600">{t('fullCardDesc')}</p>
            </div>
            <input
              type="radio"
              name="paymentOption"
              value="full"
              checked={popupOption === 'full'}
              onChange={() => handlePopupOptionChange('full')}
              className="mt-1 w-6 h-6"
            />
          </label>
        </div>

        <Button
          handleClick={() => setPopupOpen(false)}
          otherClassName="mt-4 w-full p-2"
        >
          {btnT('confirm')}
        </Button>
      </ResponsiveDialogDrawer>

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
