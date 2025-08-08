import React from 'react';
import { useTranslations } from 'next-intl';
import CardWrapper from '@/components/atomic/CardWrapper';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import { ProductCardProps } from '@/interfaces';

interface InvoiceSummaryProps {
  items: (ProductCardProps & {
    parsedPrice?: number;
    parsedCurrency?: string;
  })[];
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ items }) => {
  const t = useTranslations('Invoice.summary');

  const total = items.reduce((acc, item) => {
    const priceToUse =
      item.final_price && item.final_price > 0
        ? item.final_price
        : item.parsedPrice ?? 0;
    const quantity = item.quantity ?? 1;
    return acc + priceToUse * quantity;
  }, 0);

  const totalDiscount = items.reduce(
    (acc, item) => acc + (item.discount ?? 0),
    0
  );

  // const currencyImage = items[0]?.currencyImage ?? '/assets/saudi_riyal.png';
  const currency = items[0]?.parsedCurrency ?? '';

  return (
    <CardWrapper className="p-6">
      <MotionSection index={0}>
        <h2 className="text-lg font-bold mb-6">{t('title')}</h2>
      </MotionSection>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-500 font-bold">
          <span>{t('subtotal.label')}:</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {Number(
                items.reduce(
                  (acc, item) =>
                    acc + (item.parsedPrice ?? 0) * (item.quantity ?? 1),
                  0
                )
              ).toLocaleString()}{' '}
              {currency}
            </span>
          </div>
        </div>

        {totalDiscount > 0 && (
          <MotionSection index={1}>
            <div className="flex justify-between items-center text-gray-500 font-bold">
              <span>{t('discount.label')}:</span>
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  -{Number(totalDiscount).toLocaleString()} {currency}
                </span>
              </div>
            </div>
          </MotionSection>
        )}

        <MotionSection index={2}>
          <div className="flex justify-between items-center font-bold border-t border-dotted border-gray-300 pt-4">
            <span>{t('total.label')}:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">
                {Number(total).toLocaleString()} {currency}
              </span>
            </div>
          </div>
        </MotionSection>
      </div>
    </CardWrapper>
  );
};

export default InvoiceSummary;
