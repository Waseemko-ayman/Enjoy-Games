import CardWrapper from '@/components/atomic/CardWrapper';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import InvoiceSummary from '@/components/molecules/InvoiceSummary';
import { ProductCardProps, TranslationFunction } from '@/interfaces';
import Image from 'next/image';
import React from 'react';

interface OrderSummaryProps {
  processedItems: ProductCardProps[];
  items: ProductCardProps[];
  t: TranslationFunction;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  processedItems,
  items,
  t,
}) => {
  return (
    <div className="space-y-6">
      <MotionSection index={3}>
        <CardWrapper className="p-6">
          <h2 className="text-lg font-bold mb-6">{t('cartSummary')}</h2>
          <div className="max-h-[220px] overflow-y-auto scrollbar-none">
            {processedItems.map((item: ProductCardProps, index: number) => {
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
                    <h3 className="font-semibold">{originalItem?.title}</h3>
                    <div className="flex justify-between w-full text-sm items-center">
                      {item.final_price?.amount &&
                      item.final_price?.amount !== item.price?.amount ? (
                        <>
                          <p className="text-gray-500 font-semibold line-through">
                            {(item.price?.amount ?? 0) * quantity}{' '}
                            {item.price?.currency}
                          </p>
                          <div>
                            <p className="font-semibold">
                              {item.final_price?.amount} {item.price?.currency}
                            </p>
                          </div>
                        </>
                      ) : (
                        <p className="font-semibold">
                          {(item.price?.amount ?? 0) * quantity}{' '}
                          {item.price?.currency}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardWrapper>
      </MotionSection>

      <MotionSection index={4}>
        <InvoiceSummary items={processedItems} />
      </MotionSection>
    </div>
  );
};

export default OrderSummary;
