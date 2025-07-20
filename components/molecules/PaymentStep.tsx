import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Image from 'next/image';
import CardWrapper from '../atomic/CardWrapper';
import Button from '../atomic/Button';
import SubCartHeader from './SubCartHeader';
import Layer from '../atomic/Layer';
import Container from '../organism/Container';
import InvoiceSummary from './InvoiceSummary';
import { PaymentStepProps } from '@/interfaces';
import Input from '../atomic/Input';
import MotionSection from './FramerMotion/MotionSection';

const paymentSchema = yup.object({
  paymentMethod: yup.string().required('يجب اختيار طريقة الدفع'),
  couponCode: yup.string(),
});

type PaymentFormData = yup.InferType<typeof paymentSchema>;

const PaymentStep: React.FC<PaymentStepProps> = ({
  onPaymentComplete,
  onBackToCart,
  items,
  quantity,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentSchema),
  });

  const onSubmit = () => {
    setTimeout(() => {
      onPaymentComplete();
    }, 2000);
  };

  return (
    <Layer otherClassName="!my-12 max-sm:!mb-24">
      <Container>
        <SubCartHeader
          title="اختر وسيلة الدفع"
          handleClick={onBackToCart}
          btnText="العودة للخلف"
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
                <h3 className="text-lg font-bold mb-4">كوبون الخصم:</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    variant="secondary"
                    placeholder="هل لديك كوبون خصم؟"
                    otherClassNameContainer="flex-1 focus:ring-2 focus:ring-purple-500"
                    inputName="couponCode"
                    {...register('couponCode')}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    otherClassName="py-3 sm:px-6 max-sm:w-full"
                  >
                    تطبيق
                  </Button>
                </div>
              </CardWrapper>
            </MotionSection>

            <MotionSection index={2}>
              <Button type="submit" otherClassName="w-full py-3">
                ادفع
              </Button>
            </MotionSection>
          </div>

          <div className="space-y-6">
            <MotionSection index={3}>
              <CardWrapper className="p-6">
                <h2 className="text-lg font-bold mb-6">ملخص سلة التسوق</h2>
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="/assets/games-banners/fc24-banner.webp"
                    alt="نينتندو"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">نينتندو 10 دولار</h3>
                    <p className="text-sm text-gray-600">المتجر الأمريكي</p>
                  </div>
                </div>
              </CardWrapper>
            </MotionSection>

            <MotionSection index={4}>
              <InvoiceSummary item={items[0]} quantity={quantity} />
            </MotionSection>
          </div>
        </form>
      </Container>
    </Layer>
  );
};

export default PaymentStep;
