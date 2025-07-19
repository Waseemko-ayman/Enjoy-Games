'use client';

import Image from 'next/image';
import CardWrapper from '@/components/atomic/CardWrapper';
import { CartItemData } from '@/interfaces';

interface InvoiceSummaryProps {
  item: CartItemData;
  quantity: number;
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ item, quantity }) => {
  const total = item.price * quantity;

  return (
    <CardWrapper className="p-6">
      <h2 className="text-lg font-bold mb-6">ملخص الفاتورة</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-500 font-bold">
          <span>الإجمالي الفرعي:</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">{total}</span>
            <Image
              src={`/assets/${item.currencyImage}`}
              alt="عملة"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className="flex justify-between items-center text-gray-500 font-bold border-b border-dotted border-gray-300 pb-4">
          <span>ضريبة القيمة المضافة:</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">{total}</span>
            <Image
              src={`/assets/${item.currencyImage}`}
              alt="عملة"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className="flex justify-between items-center font-bold">
          <span>إجمالي المبلغ:</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{total}</span>
            <Image
              src={`/assets/${item.currencyImage}`}
              alt="عملة"
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default InvoiceSummary;
