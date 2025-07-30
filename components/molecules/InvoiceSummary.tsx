'use client';

import Image from 'next/image';
import CardWrapper from '@/components/atomic/CardWrapper';
import MotionSection from './FramerMotion/MotionSection';
import { useTranslations } from 'next-intl';
import { ProductCardProps } from '@/interfaces';

interface InvoiceSummaryProps {
  item: ProductCardProps;
  quantity: number;
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ item, quantity }) => {
  const total = (item.price ?? 0) * quantity;
  const t = useTranslations('Invoice.summary');

  return (
    <CardWrapper className="p-6">
      <MotionSection index={0}>
        <h2 className="text-lg font-bold mb-6">{t('title')}</h2>
      </MotionSection>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-500 font-bold">
          <span>{t('subtotal.label')}:</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">{total}</span>
            <Image
              src={item.currencyImage ?? ''}
              alt="عملة"
              width={18}
              height={18}
            />
          </div>
        </div>
        <MotionSection index={1}>
          <div className="flex justify-between items-center text-gray-500 font-bold border-b border-dotted border-gray-300 pb-4">
            <span>{t('vat.label')}:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg">{total}</span>
              <Image
                src={item.currencyImage ?? ''}
                alt="عملة"
                width={18}
                height={18}
              />
            </div>
          </div>
        </MotionSection>
        <MotionSection index={2}>
          <div className="flex justify-between items-center font-bold">
            <span>{t('total.label')}:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{total}</span>
              <Image
                src={item.currencyImage ?? ''}
                alt="عملة"
                width={18}
                height={18}
              />
            </div>
          </div>
        </MotionSection>
      </div>
    </CardWrapper>
  );
};

export default InvoiceSummary;
