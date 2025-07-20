import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atomic/Button';
import CardWrapper from '@/components/atomic/CardWrapper';
import { Minus, Trash2 } from 'lucide-react';
import { FaPlus, FaStar } from 'react-icons/fa6';
import SubCartHeader from '../molecules/SubCartHeader';
import { CartContentProps } from '@/interfaces';
import { PATHS } from '@/data/paths';
import Layer from '../atomic/Layer';
import InvoiceSummary from '../molecules/InvoiceSummary';
import Container from './Container';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';
import MotionSection from '../molecules/FramerMotion/MotionSection';

const CartContent: React.FC<CartContentProps> = ({
  items,
  onProceedToPayment,
  quantity,
  setQuantity,
  // onSendAsGift,
}) => {
  return (
    <Layer otherClassName="!my-12">
      <Container>
        <SubCartHeader
          title="ملخص السلة"
          href={PATHS.STORE.link}
          btnText="العودة للتسوق"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <AnimatedWrapper key={item.id} custom={index}>
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
                        handleClick={() =>
                          setQuantity(Math.max(1, quantity - 1))
                        }
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
              </AnimatedWrapper>
            ))}

            <MotionSection index={0}>
              <div className="text-sm font-semibold leading-relaxed">
                <p>
                  بالانتقال الى الدفع فانت تتوافق على{' '}
                  <Link
                    href={PATHS.TERMS_OF_USER.link}
                    className="text-enjoy-primary underline cursor-pointer"
                  >
                    سياسة الاستخدام
                  </Link>{' '}
                  و{' '}
                  <Link
                    href={PATHS.PRIVACY_POLICY.link}
                    className="text-enjoy-primary underline cursor-pointer"
                  >
                    سياسة الخصوصية
                  </Link>{' '}
                  لـ دليل ستور
                </p>
              </div>
            </MotionSection>

            <MotionSection index={1}>
              <Button
                otherClassName="w-full py-3"
                handleClick={onProceedToPayment}
              >
                إتمام الدفع
              </Button>
            </MotionSection>

            {/* <Button
              variant="forth"
              otherClassName="w-full py-3"
              Icon={Gift}
              iconPosition="right"
              handleClick={onSendAsGift}
            >
              أرسلها كهدية
            </Button> */}
          </div>

          <div className="space-y-6">
            <MotionSection index={0}>
              <InvoiceSummary item={items[0]} quantity={quantity} />
            </MotionSection>

            <MotionSection index={1}>
              <CardWrapper
                bgColor="bg-enjoy-secondary-soft"
                className="text-enjoy-secondary flex items-center justify-between gap-2 p-4 !shadow-none"
              >
                <p className="text-sm font-semibold">
                  أكمل الشراء واكسب 1000 نقطة في دليل ستارز
                </p>
                <FaStar className="w-5 h-5" />
              </CardWrapper>
            </MotionSection>

            <MotionSection index={2}>
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
                      من منطلق المسؤولية الاجتماعية ومشاركتنا الأجر, تم تخصيص
                      جزء من أرباحنا لدعم مشاريع جمعية حجر الخيرية
                    </p>
                  </div>
                </div>
              </CardWrapper>
            </MotionSection>
          </div>
        </div>
      </Container>
    </Layer>
  );
};

export default CartContent;
