/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Image from 'next/image';

import CardWrapper from '@/components/atomic/CardWrapper';
import Button from '@/components/atomic/Button';
import SubCartHeader from '@/components/molecules/SubCartHeader';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import InvoiceSummary from '@/components/molecules/InvoiceSummary';
import Input from '@/components/atomic/Input';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';

import { PaymentStepProps, ProductCardProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import useAPI from '@/hook/useAPI';
import { useToast } from '@/lib/toast';
import ButtonLoading from '@/components/atomic/ButtonLoading';

// Helper function to parse price with fallback value
function parsedPriceOrFallback(price?: number, parsedPrice?: number) {
  return parsedPrice ?? price ?? 0;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ onBackToCart, items }) => {
  // State variables
  const [couponResponse, setCouponResponse] = useState<typeof data | null>(
    null
  );
  const [, setOrderResponse] = useState<typeof orderData | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Translations hooks
  const t = useTranslations('MyCart');
  const btnTexts = useTranslations('BtnTexts');
  const inputsTexts = useTranslations('Inputs');

  // Toast notifications
  const { showToast } = useToast();

  // API hooks
  const { add: AddCoupon, data, isLoading } = useAPI('coupon/apply-coupon');
  const {
    add: orderAdd,
    data: orderData,
    isLoading: orderIsLoading,
  } = useAPI('order/create');
  const { add: payOrder } = useAPI('order/pay');

  // Validation schema
  const paymentSchema = yup.object({
    paymentMethod: yup
      .string()
      .required(inputsTexts('errorsMsgs.paymentRequired')),
    couponCode: yup.string().nullable().default(null),
  });

  type PaymentFormData = {
    paymentMethod: string;
    couponCode: string | null;
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      paymentMethod: '',
      couponCode: null,
    },
  });

  // Apply coupon handler
  const onApplyCoupon = async () => {
    const couponCode = watch('couponCode');
    if (!couponCode || !couponCode.trim()) return;

    const cartForApi = items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity || 1,
      shipping_data: item.formScheme,
    }));

    try {
      const responseData = await AddCoupon({
        cart: cartForApi,
        coupon_code: couponCode,
      });
      setCouponResponse(responseData?.data);
      setAppliedCoupon(couponCode);
      showToast(t('discountSuccess'));
    } catch (err) {
      showToast(t('discountFaild'), 'error');
      console.error(err);
    }
  };

  // Submit payment handler
  const onSubmit = async (data: PaymentFormData) => {
    const couponCodeToSend = data?.couponCode || appliedCoupon;
    const cartSource = couponResponse ?? items;
    const paymentGateway = data.paymentMethod;

    const cartForApi = cartSource.map(
      (item: ProductCardProps, index: number) => {
        const originalItem = items[index];
        return {
          product_id: item.product_id || item.id,
          quantity: item.quantity || 1,
          shipping_data: item.formScheme ?? originalItem?.formScheme,
        };
      }
    );

    try {
      const responseData = await orderAdd({
        cart: cartForApi,
        coupon_code: couponCodeToSend || null,
      });

      setOrderResponse(responseData);
      reset();

      if (responseData?.success) {
        showToast(responseData?.message || t('orderSuccess'));
      } else {
        showToast(responseData?.message || t('orderFaild'), 'error');
      }

      if (responseData?.data?.order_id) {
        const paymentPayload = {
          order_id: responseData?.data?.order_id,
          payment_gateway: paymentGateway,
        };
        const paymentData = await payOrder(paymentPayload);
        window.open(
          paymentData?.data?.payment_url,
          '_blank',
          'width=500,height=700,top=40,left=400'
        );
      }
    } catch (err) {
      const apiError = err?.response?.data?.message;
      showToast(apiError, 'error');
    }
  };

  // Prepare items for rendering with parsed price and currency
  const processedItems = (couponResponse ?? items).map(
    (item: ProductCardProps) => {
      const priceParts = item.price?.toString().match(/^([\d.,]+)\s*(.*)$/);
      const parsedPrice = parseFloat(priceParts?.[1]?.replace(',', '') || '0');
      const parsedCurrency = priceParts?.[2] || 'ر.س.';
      return {
        ...item,
        parsedPrice,
        parsedCurrency,
      };
    }
  );

  return (
    <Layer otherClassName="!my-12 max-sm:!mb-24">
      <Container>
        <SubCartHeader
          title={t('choosePaymentMethod')}
          handleClick={onBackToCart}
          btnText={btnTexts('GoBack')}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left section: Payment options and coupon input */}
          <div className="lg:col-span-2 space-y-6">
            <MotionSection index={0}>
              <label>
                <CardWrapper
                  className={`p-6 cursor-pointer ${
                    errors.paymentMethod ? 'border border-red-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="radio"
                      value="paymob"
                      {...register('paymentMethod')}
                      className="w-4 h-4 text-enjoy-primary"
                    />
                    <Image
                      src="/assets/paymob-logo.png"
                      alt="Apple Pay"
                      width={70}
                      height={70}
                    />
                  </div>
                </CardWrapper>
              </label>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.paymentMethod.message}
                </p>
              )}
            </MotionSection>

            <MotionSection index={1}>
              <CardWrapper className="p-6 mt-5">
                <h3 className="text-lg font-bold mb-4">
                  {t('discountCoupon')}
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    variant="secondary"
                    placeholder={inputsTexts('placeHolders.haveCoupon')}
                    otherClassNameContainer="flex-1 focus:ring-2 focus:ring-purple-500"
                    inputName="couponCode"
                    {...register('couponCode')}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    otherClassName="py-3 sm:px-6 max-sm:w-full"
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

          {/* Right section: Order summary */}
          <div className="space-y-6">
            <MotionSection index={3}>
              <CardWrapper className="p-6">
                <h2 className="text-lg font-bold mb-6">{t('cartSummary')}</h2>
                <div className="max-h-[220px] overflow-y-auto scrollbar-none">
                  {processedItems.map(
                    (item: ProductCardProps, index: number) => {
                      const originalItem = items[index];
                      const quantity = item.quantity ?? 1;

                      return (
                        <div
                          key={`${item.id}-${index}`}
                          className="flex items-center gap-4 mb-4"
                        >
                          <Image
                            src="/assets/play-station.webp"
                            alt="Nintendo"
                            width={80}
                            height={80}
                            className="rounded-lg"
                          />
                          <div className="flex flex-col w-full">
                            <h3 className="font-semibold">
                              {originalItem?.title}
                            </h3>
                            <div className="flex justify-between w-full text-sm items-center">
                              {item.final_price &&
                              item.final_price !== item.price ? (
                                <>
                                  <p className="text-gray-500 font-semibold line-through">
                                    {(item.price ?? 0) * quantity}{' '}
                                    {item.parsedCurrency}
                                  </p>
                                  <p className="font-semibold">
                                    {item.final_price} {item.parsedCurrency}
                                  </p>
                                </>
                              ) : (
                                <p className="font-semibold">
                                  {(
                                    parsedPriceOrFallback(
                                      item.price,
                                      item.parsedPrice
                                    ) * quantity
                                  ).toLocaleString()}{' '}
                                  {item.parsedCurrency}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </CardWrapper>
            </MotionSection>

            <MotionSection index={4}>
              <InvoiceSummary items={processedItems} />
            </MotionSection>
          </div>
        </form>
      </Container>
    </Layer>
  );
};

export default PaymentStep;
