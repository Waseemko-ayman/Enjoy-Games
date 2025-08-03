/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { lazy, Suspense, useState } from 'react';
import Button from '@/components/atomic/Button';
import Input from '@/components/atomic/Input';
import CardWrapper from '@/components/atomic/CardWrapper';
import Loading from '@/components/molecules/loading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormError from '@/components/atomic/FormError';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductCardProps } from '@/interfaces';
import { InputTypes } from '@/utils/type';
import {
  accessInputs,
  accountIdInputs,
  codeInputs,
  multiIdInputs,
} from '@/data';
import MotionSection from './FramerMotion/MotionSection';

const Image = lazy(() => import('next/image'));

const inputQuantityOptions = [
  { id: 1, label: '1' },
  { id: 2, label: '2' },
  { id: 3, label: '3' },
  { id: 4, label: '4' },
];

interface Props {
  product: ProductCardProps;
  onAddToCart: (data: any) => void;
}

const ProductDetailsInDialog: React.FC<Props> = ({ product, onAddToCart }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const t = useTranslations('productDetails');
  const inputsTxt = useTranslations('Inputs');
  const btnTxt = useTranslations('BtnTexts');

  const selectedInputs =
    product?.shipping_payment === 'code'
      ? codeInputs
      : product?.shipping_payment === 'account_id'
      ? accountIdInputs
      : product?.shipping_payment === 'multi_id'
      ? multiIdInputs
      : product?.shipping_payment === 'access'
      ? accessInputs
      : [];

  // بناء مخطط التحقق
  const dynamicSchemaFields = selectedInputs.reduce((acc, input) => {
    acc[input.inputName] = yup
      .string()
      .required(inputsTxt(`errorsMsgs.${input.errorKey}`));
    return acc;
  }, {} as Record<string, yup.StringSchema>);

  const schema = yup.object().shape(dynamicSchemaFields);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = (formValues: Record<string, any>) => {
    onAddToCart({
      ...product,
      quantity: selectedQuantity,
      formScheme: formValues,
    });
  };

  return (
    <div className="max-h-[550px] overflow-y-auto scrollbar-none">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Suspense fallback={<Loading />}>
            <Image
              src="/assets/play-station.webp"
              alt={product.title}
              width={170}
              height={170}
              className="rounded-lg object-cover"
            />
          </Suspense>
          <div>
            <MotionSection index={1}>
              <h1 className="text-2xl">{product?.title}</h1>
            </MotionSection>

            <MotionSection index={2}>
              <div className="gap-3 mt-4">
                <h3 className="text-xl font-semibold">{product?.price}</h3>
                <div className="flex items-center gap-3">
                  <span className="line-through text-red-500 text-base">
                    {product?.price_before}
                  </span>
                  <CardWrapper
                    bgColor="bg-red-500"
                    className="py-0.5 px-2 flex items-center justify-center"
                  >
                    <span className="text-white text-xs">
                      {t('rival')} {product?.discount || 9}%
                    </span>
                  </CardWrapper>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-5">
            <MotionSection index={4}>
              <h3 className="text-lg font-semibold mb-1">
                {t('productOverview')}
              </h3>
            </MotionSection>
            <MotionSection index={5}>
              <p className="text-[15px] text-gray-500">{product?.content}</p>
            </MotionSection>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <Input
              variant="secondary"
              type="number"
              inputName="quantity"
              label={inputsTxt('labels.quantity')}
              options={inputQuantityOptions}
              value={selectedQuantity}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 1) setSelectedQuantity(val);
              }}
            />

            <Accordion type="single" collapsible>
              <AccordionItem value="extra-options">
                <AccordionTrigger className="cursor-pointer border-b border-gray-300 pb-2 mb-3">
                  {t('additionalOptions')}
                </AccordionTrigger>
                <AccordionContent className="space-y-3 max-h-60 overflow-auto">
                  {selectedInputs.map((input) => (
                    <div key={input.id}>
                      <Input
                        variant="secondary"
                        type={input.type as InputTypes}
                        inputName={input.inputName}
                        label={
                          input.label || inputsTxt(`labels.${input.labelKey}`)
                        }
                        options={input.options?.map((opt) => ({
                          ...opt,
                          label: inputsTxt(`labels.${opt.labelKey}`),
                        }))}
                        placeholder={
                          input.inputName === 'checkbox'
                            ? inputsTxt(`placeHolders.Cancelled`)
                            : ''
                        }
                        otherClassNameContainer={
                          errors[input.inputName] ? 'border-red-500' : ''
                        }
                        isRequired
                        {...register(input.inputName)}
                      />
                      {errors[input.inputName] && (
                        <FormError message={errors[input.inputName]?.message} />
                      )}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button
              type="submit"
              otherClassName="w-full py-3 px-5 flex items-center justify-center gap-2"
              Icon={MdAddShoppingCart}
            >
              {btnTxt('addToCart')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsInDialog;
