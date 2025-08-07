/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import SubCartHeader from '@/components/molecules/SubCartHeader';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';

import {
  CartItem,
  CouponResponse,
  OrderRequest,
  OrderResponseData,
  PaymentFormData,
  PaymentRequest,
  PaymentResponseData,
  PaymentStepProps,
  ProductCardProps,
} from '@/interfaces';
import { useTranslations } from 'next-intl';
import useAPI from '@/hook/useAPI';
import { useToast } from '@/lib/toast';
import OrderSummary from './OrderSummary';
import PaymentOptions from './PaymentOptions';

const PaymentStep: React.FC<PaymentStepProps> = ({ onBackToCart, items }) => {
  // State variables
  const [couponResponse, setCouponResponse] = useState<typeof data | null>(
    null
  );
  const [, setOrderResponse] = useState<OrderResponseData | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Translations hooks
  const t = useTranslations('MyCart');
  const btnTexts = useTranslations('BtnTexts');
  const inputsTexts = useTranslations('Inputs');

  // Toast notifications
  const { showToast } = useToast();

  // API hooks
  const {
    add: AddCoupon,
    data,
    isLoading,
  } = useAPI<{ cart: CartItem[]; coupon_code: string }, CouponResponse>(
    'coupon/apply-coupon'
  );
  const { add: orderAdd, isLoading: orderIsLoading } = useAPI<
    OrderRequest,
    OrderResponseData
  >('order/create');

  const { add: payOrder } = useAPI<PaymentRequest, PaymentResponseData>(
    'order/pay'
  );

  // Validation schema
  const paymentSchema = yup.object({
    paymentMethod: yup
      .string()
      .required(inputsTexts('errorsMsgs.paymentRequired')),
    couponCode: yup.string().nullable().default(null),
  });

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

      setOrderResponse(responseData.data);
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

        // const paymentWindow = window.open(
        //   paymentData?.data?.payment_url,
        //   '_blank',
        //   'width=500,height=700,top=40,left=400'
        // );

        // if (paymentWindow) {
        //   const interval = setInterval(() => {
        //     if (paymentWindow.closed) {
        //       clearInterval(interval);
        //       window.location.reload();
        //     }
        //   }, 500);
        // }
      }
    } catch (err) {
      const apiError = (err as any)?.response?.data?.message;
      showToast(apiError, 'error');
    }
  };

  // Prepare items for rendering with parsed price and currency
  const processedItems = (couponResponse ?? items).map(
    (item: ProductCardProps) => {
      const cleanNumber = (value: string | number | undefined): number => {
        if (!value) return 0;
        if (typeof value === 'number') return value;
        const match = value.match(/^([\d.,]+)\s*(.*)$/);
        const num = parseFloat(match?.[1]?.replace(',', '') || '0');
        return isNaN(num) ? 0 : num;
      };

      const extractCurrency = (value: string | number | undefined): string => {
        if (!value || typeof value === 'number') return '';
        const match = value.match(/^([\d.,]+)\s*(.*)$/);
        return match?.[2]?.trim() || '';
      };

      return {
        ...item,
        parsedPrice: cleanNumber(item.price),
        final_price: cleanNumber(item.final_price),
        discount: cleanNumber(item.discount),
        parsedCurrency: extractCurrency(item.price),
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
          {/* Payment options and coupon input */}
          <PaymentOptions
            register={register}
            errors={errors}
            onApplyCoupon={onApplyCoupon}
            isLoading={isLoading}
            orderIsLoading={orderIsLoading}
            btnTexts={btnTexts}
            inputsTexts={inputsTexts}
            t={t}
          />

          {/* Order summary */}
          <OrderSummary processedItems={processedItems} items={items} t={t} />
        </form>
      </Container>
    </Layer>
  );
};

export default PaymentStep;
