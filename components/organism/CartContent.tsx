'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atomic/Button';
import CardWrapper from '@/components/atomic/CardWrapper';
import { Gift, Minus, Trash2 } from 'lucide-react';
import { FaPlus, FaStar } from 'react-icons/fa6';
import SubCartHeader from '../molecules/SubCartHeader';
import { CartItemData } from '@/interfaces';

interface CartContentProps {
  items: CartItemData[];
}

const CartContent: React.FC<CartContentProps> = ({ items }) => {
  const [quantity, setQuantity] = useState(items[0]?.quantity || 1);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <SubCartHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <CardWrapper className="p-6" key={item.id}>
                <div className="flex items-end justify-between gap-4 mb-4 max-sm:flex-col sm:items-start">
                  <div className="flex max-sm:w-full max-sm:flex-col gap-2 sm:gap-4">
                    <Image
                      src={`/assets/${item.image}`}
                      alt={item.title}
                      width={150}
                      height={150}
                      className="rounded-xl max-sm:w-full"
                    />
                    <div className="flex sm:flex-col justify-between py-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{item.title}</h3>
                        <Image
                          src={`/assets/${item.currencyImage}`}
                          alt="ريال سعودي"
                          width={18}
                          height={18}
                        />
                      </div>
                      <p className="text-center text-xs sm:text-sm text-gray-600 font-semibold bg-[var(--enjoy-gray-100)] py-2 px-3 rounded-full">
                        {item.storeLabel}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    otherClassName="!text-gray-400 hover:!text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between border-t border-dotted border-gray-300 pt-4">
                  <div className="flex items-center gap-5">
                    <Button
                      variant="circle"
                      handleClick={() => setQuantity(Math.max(1, quantity - 1))}
                      bgColor="bg-gray-100"
                      hoverBgColor="bg-gray-200"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </Button>
                    <span className="font-bold">{quantity}</span>
                    <Button
                      variant="circle"
                      handleClick={() => setQuantity(quantity + 1)}
                      bgColor="bg-gray-900"
                      hoverBgColor="bg-gray-800"
                    >
                      <FaPlus className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">
                      {item.price * quantity}
                    </span>
                    <Image
                      src={`/assets/${item.currencyImage}`}
                      alt="ريال سعودي"
                      width={18}
                      height={18}
                    />
                  </div>
                </div>
              </CardWrapper>
            ))}

            <div className="text-sm font-semibold leading-relaxed">
              <p>
                بالانتقال الى الدفع فانت تتوافق على{' '}
                <Link
                  href="#"
                  className="text-enjoy-primary underline cursor-pointer"
                >
                  سياسة الاستخدام
                </Link>{' '}
                و{' '}
                <Link
                  href="#"
                  className="text-enjoy-primary underline cursor-pointer"
                >
                  سياسة الخصوصية
                </Link>{' '}
                لـ دليل ستور
              </p>
            </div>

            <Button otherClassName="w-full py-3">إتمام الدفع</Button>
            <Button
              variant="forth"
              href="#"
              otherClassName="w-full py-3"
              Icon={Gift}
            >
              أرسل كهدية
            </Button>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-6">ملخص الفاتورة</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-500 font-bold border-b border-dotted border-gray-300 pb-4">
                  <span>الإجمالي الفرعي:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{items[0].price * quantity}</span>
                    <Image
                      src={`/assets/${items[0].currencyImage}`}
                      alt="ريال سعودي"
                      width={18}
                      height={18}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <span>إجمالي المبلغ:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">
                      {items[0].price * quantity}
                    </span>
                    <Image
                      src={`/assets/${items[0].currencyImage}`}
                      alt="ريال سعودي"
                      width={18}
                      height={18}
                    />
                  </div>
                </div>
              </div>
            </div>

            <CardWrapper
              bgColor="bg-enjoy-secondary-soft"
              className="text-enjoy-secondary flex items-center justify-between gap-2 p-4 !shadow-none"
            >
              <p className="text-sm font-semibold">
                أكمل الشراء واكسب 1000 نقطة في دليل ستارز
              </p>
              <FaStar className="w-5 h-5" />
            </CardWrapper>

            <CardWrapper
              bgColor="bg-[var(--enjoy-gray-100)]"
              className="p-6 !shadow-none"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center bg-enjoy-primary rounded-sm p-1">
                  <span className="text-enjoy-primary text-xl">🤝</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    سيتم التبرع بجزء من أرباحنا لهذا الطلب
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    من منطلق المسؤولية الاجتماعية ومشاركتنا الأجر, تم تخصيص جزء
                    من أرباحنا لدعم مشاريع جمعية حجر الخيرية
                  </p>
                </div>
              </div>
            </CardWrapper>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-6 left-6">
        <button className="w-14 h-14 bg-enjoy-primary rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors">
          <span className="text-white text-2xl">💬</span>
        </button>
      </div>
    </div>
  );
};

export default CartContent;
