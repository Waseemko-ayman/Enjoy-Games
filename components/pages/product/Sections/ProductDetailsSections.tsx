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
import { FOOTER_LINKS_DATA, inputsViaEntry } from '@/data';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { ProductCardProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React, { lazy, Suspense } from 'react';
import { FaStar } from 'react-icons/fa6';
import { MdAdd, MdAddShoppingCart } from 'react-icons/md';

const inputQuantityOptions = [
  { id: 1, label: '1' },
  { id: 2, label: '2' },
  { id: 3, label: '3' },
  { id: 4, label: '4' },
];

const ProductDetailsSections = ({ product }: { product: ProductCardProps }) => {
  const t = useTranslations('productDetails');
  const inputsTxt = useTranslations('Inputs');
  const btnTxt = useTranslations('BtnTexts');
  const { isArabic } = useToggleLocale();
  return (
    <CardWrapper className="flex flex-col md:flex-row gap-7 p-4 md:p-10">
      <MotionSection index={0}>
        <Suspense fallback={<Loading />}>
          <Image
            src="/assets/play-station.webp"
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
              {product?.price_before} دإ
            </h3>
            <div className="flex items-center gap-3">
              <span className="line-through text-red-500 text-base">
                {product?.price} دإ
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

        <MotionSection index={3}>
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
        </MotionSection>

        <div className="mt-7">
          <MotionSection index={4}>
            <h3 className="text-lg font-semibold mb-2">
              {t('productOverview')}
            </h3>
          </MotionSection>
          <MotionSection index={5}>
            <p className="text-[15px] text-gray-500">{product?.content}</p>
          </MotionSection>
        </div>

        <form className="mt-4 space-y-7">
          <MotionSection index={6}>
            <Input
              variant="secondary"
              type="select"
              inputName="quantity"
              label={inputsTxt('labels.quantity')}
              options={inputQuantityOptions}
            />
          </MotionSection>

          <MotionSection index={7}>
            <Accordion type="single" collapsible>
              <AccordionItem value="extra-options">
                <AccordionTrigger className="mb-4 cursor-pointer border-b border-gray-200 pb-2">
                  {t('additionalOptions')}
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  {inputsViaEntry.map((input, index) => (
                    <AnimatedWrapper key={input.id} custom={index}>
                      <Input
                        variant="secondary"
                        type={input.type}
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
                        isRequired
                      />
                    </AnimatedWrapper>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </MotionSection>

          <MotionSection index={8}>
            <Button otherClassName="py-3 px-5 w-full" Icon={MdAddShoppingCart}>
              {btnTxt('addToCart')}
            </Button>
          </MotionSection>
        </form>
      </div>
    </CardWrapper>
  );
};

export default ProductDetailsSections;
