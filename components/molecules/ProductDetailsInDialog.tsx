/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
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
import { extractText } from '@/utils/extractText';
import { API_IMAGE_URL } from '@/config/api';
import dynamic from 'next/dynamic';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import { useToast } from '@/lib/toast';
const Image = dynamic(() => import('next/image'), {
  loading: () => <Loading />,
});

interface Props {
  product: ProductCardProps;
  onAddToCart: (data: any) => void;
}

const ProductDetailsInDialog: React.FC<Props> = ({ product, onAddToCart }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const t = useTranslations('productDetails');
  const inputsTxt = useTranslations('Inputs');
  const btnTxt = useTranslations('BtnTexts');
  const msgTxts = useTranslations('Messages');
  const { showToast } = useToast();

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
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddToCart = (formValues: Record<string, any>) => {
    onAddToCart({
      ...product,
      quantity: selectedQuantity,
      formScheme: formValues,
    });
    showToast(`${product.title} ${msgTxts('addedToCart')}`);
    setTimeout(() => {
      reset();
    }, 3000);
  };
  return (
    <div className="max-h-[550px] overflow-y-auto scrollbar-none">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Image
            src={
              `${API_IMAGE_URL}${product?.image}` || '/assets/play-station.webp'
            }
            alt={product?.title}
            width={170}
            height={170}
            className="rounded-lg object-cover"
          />
          <div>
            <MotionSection index={1}>
              <h1 className="text-2xl">{product?.title || product?.name}</h1>
            </MotionSection>

            <MotionSection index={2}>
              <div className="gap-3 mt-4">
                <h3 className="text-xl font-semibold">
                  {product?.price?.amount} {product?.price?.currency}
                </h3>
                {product?.discount?.amount && (
                  <div className="flex items-center gap-3">
                    <span className="line-through text-red-500 text-base font-semibold">
                      {product?.price_before?.amount}{' '}
                      {product?.price_before?.currency}
                    </span>
                    <CardWrapper
                      bgColor="bg-red-500"
                      className="py-0.5 px-2 flex items-center justify-center"
                    >
                      <span className="text-white text-xs">
                        {t('rival')} {product?.discount?.amount}{' '}
                        {product?.discount?.currency}
                      </span>
                    </CardWrapper>
                  </div>
                )}
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
              <p className="text-[15px] text-gray-500">
                {extractText(product?.contentn)}
              </p>
            </MotionSection>
          </div>

          <form
            className="mt-4 space-y-7"
            onSubmit={handleSubmit((formValues) => {
              handleAddToCart(formValues);
            })}
          >
            <MotionSection index={6}>
              <Input
                variant="secondary"
                type="number"
                inputName="quantity"
                label={inputsTxt('labels.quantity')}
                value={selectedQuantity}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 1) setSelectedQuantity(value);
                }}
              />
            </MotionSection>

            <MotionSection index={7}>
              <Accordion type="single" collapsible defaultValue="extra-options">
                <AccordionItem value="extra-options">
                  <AccordionTrigger className="mb-4 cursor-pointer border-b border-gray-200 pb-2">
                    {t('additionalOptions')}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    {selectedInputs.map((input, index) => (
                      <AnimatedWrapper key={input.id} custom={index}>
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
                          control={control}
                          {...(input.type !== 'checkbox'
                            ? register(input.inputName)
                            : {})}
                        />
                        {errors[input.inputName] && (
                          <FormError
                            message={errors[input.inputName]?.message}
                          />
                        )}
                      </AnimatedWrapper>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </MotionSection>

            <MotionSection index={8}>
              <Button
                type="submit"
                otherClassName="py-3 px-5 w-full"
                Icon={MdAddShoppingCart}
              >
                {btnTxt('addToCart')}
              </Button>
            </MotionSection>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsInDialog;
