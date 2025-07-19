import React from 'react';
import { Check, Download, Home } from 'lucide-react';
import CardWrapper from '../atomic/CardWrapper';
import Button from '../atomic/Button';
import Layer from '../atomic/Layer';
import Container from '../organism/Container';

interface OrderCompleteStepProps {
  onReturnToStore: () => void;
  orderNumber: string;
}

const OrderCompleteStep: React.FC<OrderCompleteStepProps> = ({
  onReturnToStore,
  orderNumber,
}) => {
  return (
    <Layer otherClassName="!my-9 sm:!my-12">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <CardWrapper className="p-5 sm:p-8">
            <div className="mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                تم إتمام طلبك بنجاح!
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                شكراً لك على ثقتك بنا. سيتم إرسال تفاصيل الطلب على بريدك
                الإلكتروني
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">رقم الطلب:</span>
                <span className="font-bold text-base sm:text-lg">
                  #{orderNumber}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">حالة الطلب:</span>
                <span className="text-green-600 font-semibold">مؤكد</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">طريقة التسليم:</span>
                <span className="font-semibold">
                  فوري (رقمياً)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                otherClassName="w-full py-3"
                Icon={Download}
                iconPosition="left"
              >
                تحميل الفاتورة
              </Button>

              <Button
                variant="secondary"
                otherClassName="w-full py-3"
                Icon={Home}
                iconPosition="left"
                handleClick={onReturnToStore}
              >
                العودة للمتجر
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 p-4 bg-enjoy-glass rounded-lg">
              <div className="flex items-center justify-center gap-2 text-enjoy-primary mb-2">
                <span className="text-2xl">⭐</span>
                <span className="font-semibold">
                  تم إضافة 1000 نقطة لحسابك!
                </span>
              </div>
              <p className="text-sm text-gray-600">
                يمكنك استخدام النقاط في عمليات الشراء القادمة
              </p>
            </div>
          </CardWrapper>
        </div>
      </Container>
    </Layer>
  );
};

export default OrderCompleteStep;
