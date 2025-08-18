/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

const Image = lazy(() => import('next/image'));
import Button from '@/components/atomic/Button';
import CardWrapper from '@/components/atomic/CardWrapper';
import Input from '@/components/atomic/Input';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import Loading from '@/components/molecules/loading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useCartContext } from '@/context/CartContext';
import {
  FOOTER_LINKS_DATA,
  accessInputs,
  accountIdInputs,
  codeInputs,
  multiIdInputs,
} from '@/data';
import { ProductCardProps } from '@/interfaces';
import { useToast } from '@/lib/toast';
import { InputTypes } from '@/utils/type';
import { useTranslations } from 'next-intl';
import React, { lazy, Suspense, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormError from '@/components/atomic/FormError';
import { extractText } from '@/utils/extractText';

const inputQuantityOptions = [
  { id: 1, label: '1' },
  { id: 2, label: '2' },
  { id: 3, label: '3' },
  { id: 4, label: '4' },
];

const ProductDetailsSections = ({ product }: { product: ProductCardProps }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const t = useTranslations('productDetails');
  const inputsTxt = useTranslations('Inputs');
  const btnTxt = useTranslations('BtnTexts');
  const msgTxts = useTranslations('Messages');
  // const { isArabic } = useToggleLocale();
  const { addToCart } = useCartContext();
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddToCart = (formValues: Record<string, any>) => {
    addToCart({
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
    <CardWrapper className="flex flex-col md:flex-row gap-7 p-4 md:p-10">
      <MotionSection index={0}>
        <Suspense fallback={<Loading />}>
          <Image
            src={
              // `${API_IMAGE_URL}${product?.image}` ||
              '/assets/play-station.webp'
            }
            alt="play-station"
            width={300}
            height={300}
            className="rounded-xl max-md:w-full"
          />
        </Suspense>
        <div className="flex items-center justify-between flex-wrap gap-2 mt-5">
          <h4 className="text-base md:text-lg font-semibold">
            {t('shareLinkWith')}
          </h4>
          <div className="flex items-center gap-2">
            {FOOTER_LINKS_DATA.socialMedia.map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedWrapper key={item.id} custom={index}>
                  <div key={item.id} className="cursor-pointer">
                    <Icon
                      size={20}
                      className="hover:text-enjoy-primary transition-all duration-400"
                    />
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <div className="flex-1">
        <MotionSection index={1}>
          <h1 className="text-xl sm:text-[28px]">{product?.title}</h1>
        </MotionSection>

        <MotionSection index={2}>
          <div className="flex items-end gap-3 mt-4">
            <h3 className="text-xl sm:text-[28px] font-semibold">
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

        {/* <MotionSection index={3}>
          <div className="flex item-center justify-between gap-2 mt-4 border border-gray-400 rounded-lg p-3">
            <div
              className={`flex items-center ${
                !isArabic ? 'items-start sm:items-center' : ''
              } gap-2`}
            >
              <div className="flex items-center">
                <MdAdd className="font-bold" />
                <span className="text-enjoy-primary text-base font-bold">
                  4
                </span>
              </div>
              <h3
                className={`${isArabic ? 'text-base' : 'text-sm'} font-medium`}
              >
                {t('earnedPointsOnPurchase')}
              </h3>
            </div>
            <FaStar className="text-enjoy-secondary" size={20} />
          </div>
        </MotionSection> */}

        <div className="mt-7">
          <MotionSection index={4}>
            <h3 className="text-lg font-semibold mb-2">
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
              options={inputQuantityOptions}
              value={selectedQuantity}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 1) setSelectedQuantity(value);
              }}
            />
          </MotionSection>

          <MotionSection index={7}>
            <Accordion type="single" collapsible>
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
                        {...register(input.inputName)}
                      />
                      {errors[input.inputName] && (
                        <FormError message={errors[input.inputName]?.message} />
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
    </CardWrapper>
  );
};

export default ProductDetailsSections;
