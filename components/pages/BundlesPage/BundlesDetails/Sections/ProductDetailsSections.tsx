import Button from '@/components/atomic/Button';
import CardWrapper from '@/components/atomic/CardWrapper';
import Input from '@/components/atomic/Input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FOOTER_LINKS_DATA, inputsViaEntry } from '@/data';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { MdAdd, MdAddShoppingCart } from 'react-icons/md';

const inputQuantityOptions = [
  { id: 1, label: '1' },
  { id: 2, label: '2' },
  { id: 3, label: '3' },
  { id: 4, label: '4' },
];

const ProductDetailsSections = () => {
  return (
    <CardWrapper className="flex flex-col md:flex-row gap-7 p-4 md:p-10">
      <div>
        <Image
          src="/assets/play-station.webp"
          alt="play-station"
          width={300}
          height={300}
          className="rounded-xl max-md:w-full"
        />
        <div className="flex items-center justify-between flex-wrap gap-2 mt-5">
          <h4 className="text-base md:text-lg font-semibold">
            شارك الرابط عبر:
          </h4>
          <div className="flex items-center gap-2">
            {FOOTER_LINKS_DATA.socialMedia.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="cursor-pointer">
                  <Icon
                    size={20}
                    className="hover:text-enjoy-primary transition-all duration-400"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-xl sm:text-[28px]">
          بطاقات نينتيندو - المتجر الأمريكي
        </h1>
        <div className="flex items-end gap-3 mt-4">
          <h3 className="text-xl sm:text-[28px] font-semibold">40.15 دإ</h3>

          <div className="flex items-center gap-3">
            <span className="line-through text-red-500 text-base">
              44.07 دإ
            </span>
            <CardWrapper
              bgColor="bg-red-500"
              className="py-0.5 px-2 flex items-center justify-center"
            >
              <span className="text-white text-xs">خصم 9%</span>
            </CardWrapper>
          </div>
        </div>
        <div className="flex item-center justify-between gap-2 mt-4 border border-gray-400 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <MdAdd className="font-bold" />
              <span className="text-enjoy-primary text-base font-bold">4</span>
            </div>
            <h3 className="text-base font-medium">
              نقطة مكتسبة بشرائك هذا المنتج
            </h3>
          </div>
          <FaStar className="text-enjoy-secondary" size={20} />
        </div>
        <div className="mt-7">
          <h3 className="text-lg font-semibold mb-2">لمحة عن المنتج</h3>
          <p className="text-[15px] text-gray-500">
            تعد لعبة جواكر هي مجمع لأكثر من 30 لعبة ورق عربية، تمكنك اللعبة من
            التعرف على المزيد من الأصدقاء وتكوين صداقات جديدة مع أشخاص لديهم نفس
            الاهتمام والشغف، تعرف على أصدقاء جدد وشاركهم اللعب بضغطة زر واحدة.
          </p>
        </div>
        <form className="mt-4 space-y-7">
          <div>
            <Input
              variant="secondary"
              type="select"
              inputName="quantity"
              label="الكمية"
              options={inputQuantityOptions}
            />
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="extra-options">
              <AccordionTrigger className="mb-4 cursor-pointer border-b border-gray-200 pb-2">
                خيارات إضافية
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {inputsViaEntry.map((input) => (
                  <Input
                    key={input.id}
                    variant="secondary"
                    type={input.type}
                    inputName={input.inputName}
                    label={input.label}
                    options={input.optios}
                    placeholder={input.placeholder}
                    isRequired
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button otherClassName="py-3 px-5 w-full" Icon={MdAddShoppingCart}>
            أضف للسلة
          </Button>
        </form>
      </div>
    </CardWrapper>
  );
};

export default ProductDetailsSections;
