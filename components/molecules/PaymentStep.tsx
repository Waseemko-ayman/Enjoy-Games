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

const paymentSchema = yup.object({
  paymentMethod: yup.string().required('يجب اختيار طريقة الدفع'),
  cardNumber: yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) =>
      schema
        .required('رقم البطاقة مطلوب')
        .min(16, 'رقم البطاقة يجب أن يكون 16 رقم'),
    otherwise: (schema) => schema.notRequired(),
  }),
  expiryDate: yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema.required('تاريخ الانتهاء مطلوب'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cvv: yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) =>
      schema
        .required('رمز الأمان مطلوب')
        .min(3, 'رمز الأمان يجب أن يكون 3 أرقام على الأقل'),
    otherwise: (schema) => schema.notRequired(),
  }),
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

            <CardWrapper className="p-6 mt-5">
              <h3 className="text-lg font-bold mb-4">كوبون الخصم:</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  {...register('couponCode')}
                  placeholder="هل لديك كوبون خصم؟"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

            <Button type="submit" otherClassName="w-full py-3">
              ادفع
            </Button>
          </div>

          <div className="space-y-6">
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

            <InvoiceSummary item={items[0]} quantity={quantity} />
          </div>
        </form>
      </Container>
    </Layer>
  );
};

export default PaymentStep;
