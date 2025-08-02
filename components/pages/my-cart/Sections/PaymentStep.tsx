/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Image from 'next/image';
import CardWrapper from '../../../atomic/CardWrapper';
import Button from '../../../atomic/Button';
import SubCartHeader from '../../../molecules/SubCartHeader';
import Layer from '../../../atomic/Layer';
import Container from '../../../organism/Container';
import InvoiceSummary from '../../../molecules/InvoiceSummary';
import { PaymentStepProps, ProductCardProps } from '@/interfaces';
import Input from '../../../atomic/Input';
import MotionSection from '../../../molecules/FramerMotion/MotionSection';
import { useTranslations } from 'next-intl';
import useAPI from '@/hook/useAPI';
import { useToast } from '@/lib/toast';
import ButtonLoading from '@/components/atomic/ButtonLoading';

const PaymentStep: React.FC<PaymentStepProps> = ({
  onPaymentComplete,
  onBackToCart,
  items,
}) => {
  const [couponResponse, setCouponResponse] = useState<typeof data | null>(
    null
  );

  const t = useTranslations('MyCart');
  const btnTexts = useTranslations('BtnTexts');
  const inputsTexts = useTranslations('Inputs');
  const { add, data, isLoading } = useAPI('coupon/apply-coupon');
  const { showToast } = useToast();

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

  const onApplyCoupon = async () => {
    const couponCode = watch('couponCode');

    if (!couponCode || !couponCode.trim()) return;

    const cartForApi = items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity || 1,
      shipping_data: { email: 'test@test.com' },
    }));

    try {
      const responseData = await add({
        cart: cartForApi,
        coupon_code: couponCode,
      });
      setCouponResponse(responseData);
      showToast(t('discountSuccess'));
      reset();
    } catch (err) {
      showToast(t('discountFaild'), 'error');
      console.log(err);
    }
  };

  const onSubmit = () => {
    setTimeout(() => {
      onPaymentComplete();
    }, 2000);
  };

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
          <div className="lg:col-span-2 space-y-6">
            <MotionSection index={0}>
              <div>
                <label>
                  <CardWrapper
                    className={`p-6 cursor-pointer ${
                      errors.paymentMethod ? 'border border-red-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <input
                        type="radio"
                        value="apple-pay"
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
              </div>
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
                {btnTexts('Pay')}
              </Button>
            </MotionSection>
          </div>

          <div className="space-y-6">
            <MotionSection index={3}>
              <CardWrapper className="p-6">
                <h2 className="text-lg font-bold mb-6">{t('cartSummary')}</h2>
                <div className="max-h-[220px] overflow-y-auto scrollbar-none">
                  {(couponResponse ?? items).map(
                    (item: ProductCardProps, index: number) => {
                      const originalItem = items[index];
                      const quantity = item.quantity ?? 1;

                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 mb-4"
                        >
                          <Image
                            src="/assets/play-station.webp"
                            alt="نينتندو"
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
                                  <div className="flex items-center gap-2">
                                    <p className="text-gray-500 font-semibold line-through">
                                      {(item.price ?? 0) * quantity}
                                    </p>
                                    <Image
                                      src={
                                        item.currencyImage ??
                                        '/assets/saudi_riyal.png'
                                      }
                                      alt="ريال سعودي"
                                      width={15}
                                      height={15}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold">
                                      {item.final_price}
                                    </p>
                                    <Image
                                      src={
                                        item.currencyImage ??
                                        '/assets/saudi_riyal.png'
                                      }
                                      alt="ريال سعودي"
                                      width={15}
                                      height={15}
                                    />
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold">
                                    {(item.price ?? 0) * quantity}
                                  </p>
                                  <Image
                                    src={
                                      item.currencyImage ??
                                      '/assets/saudi_riyal.png'
                                    }
                                    alt="ريال سعودي"
                                    width={15}
                                    height={15}
                                  />
                                </div>
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
              <InvoiceSummary items={couponResponse ?? items} />
            </MotionSection>
          </div>
        </form>
      </Container>
    </Layer>
  );
};

export default PaymentStep;
