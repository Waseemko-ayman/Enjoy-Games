'use client';

import Image from 'next/image';
import CardWrapper from '@/components/atomic/CardWrapper';
import MotionSection from './FramerMotion/MotionSection';
import { useTranslations } from 'next-intl';
import { ProductCardProps } from '@/interfaces';

interface InvoiceSummaryProps {
  items: ProductCardProps[];
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ items }) => {
  const t = useTranslations('Invoice.summary');


  const total = items.reduce(
    (acc, item) =>
      acc + (item.final_price ?? (item.price ?? 0) * (item.quantity ?? 1)),
    0
  );

  const totalDiscount = items.reduce(
    (acc, item) => acc + (item.discount ?? 0),
    0
  );

  const currencyImage = items[0]?.currencyImage ?? '/assets/saudi_riyal.png';

  return (
    <CardWrapper className="p-6">
      <MotionSection index={0}>
        <h2 className="text-lg font-bold mb-6">{t('title')}</h2>
      </MotionSection>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-500 font-bold">
          <span>{t('subtotal.label')}:</span>
          <div className="flex items-center gap-2">
            {/* Total without discount */}
            <span className="text-lg">
              {items.reduce(
                (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 1),
                0
              )}
            </span>
            <Image src={currencyImage} alt="عملة" width={18} height={18} />
          </div>
        </div>

        {totalDiscount > 0 && (
          <MotionSection index={1}>
            <div className="flex justify-between items-center text-gray-500 font-bold">
              <span>{t('discount.label')}:</span>
              <div className="flex items-center gap-2">
                <span className="text-lg">-{totalDiscount}</span>
                <Image src={currencyImage} alt="عملة" width={18} height={18} />
              </div>
            </div>
          </MotionSection>
        )}

        <MotionSection index={2}>
          <div className="flex justify-between items-center font-bold border-t border-dotted border-gray-300 pt-4">
            <span>{t('total.label')}:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{total}</span>
              <Image src={currencyImage} alt="عملة" width={18} height={18} />
            </div>
          </div>
        </MotionSection>
      </div>
    </CardWrapper>
  );
};

export default InvoiceSummary;
