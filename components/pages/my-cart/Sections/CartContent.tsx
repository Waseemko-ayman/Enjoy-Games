import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Trash2 } from 'lucide-react';
import { FaPlus, FaStar } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { PATHS } from '@/data/paths';
import { useCartContext } from '@/context/CartContext';
import { useAuthContext } from '@/context/AuthContext';
import SubCartHeader from '@/components/molecules/SubCartHeader';
import Container from '@/components/organism/Container';
import CardWrapper from '@/components/atomic/CardWrapper';
import Button from '@/components/atomic/Button';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import Layer from '@/components/atomic/Layer';
import { ProductCardProps } from '@/interfaces';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { useToast } from '@/lib/toast';
import AuthButtons from '@/components/organism/MobileHeader/PopupMenu/Sections/AuthButtons';
import Loading from '@/components/molecules/loading';
import InvoiceSummary from '@/components/molecules/InvoiceSummary';

interface CartContentProps {
  items: ProductCardProps[];
  onProceedToPayment: () => void;
}

const CartContent: React.FC<CartContentProps> = ({
  items,
  onProceedToPayment,
}) => {
  const t = useTranslations('MyCart');
  const btnTexts = useTranslations('BtnTexts');
  const msgTxts = useTranslations('Messages');
  const { isArabic } = useToggleLocale();
  const { removeFromCart, updateQuantity } = useCartContext();
  const { showToast } = useToast();
  const { token } = useAuthContext();
  const points = 1000;

  const handleRemoveFromCart = (id: number, title: string) => {
    removeFromCart(id);
    showToast(`${title} ${msgTxts('removedFromCart')}`);
  };

  const processedItems = items.map((item) => {
    const priceParts = item.price?.toString().match(/^([\d.,]+)\s*(.*)$/);
    const parsedPrice = parseFloat(priceParts?.[1]?.replace(',', '') || '0');
    const parsedCurrency = priceParts?.[2] || '';
    return {
      ...item,
      parsedPrice,
      parsedCurrency,
    };
  });

  return (
    <Layer otherClassName="!my-12">
      <Container>
        <SubCartHeader
          title={t('basketSummary')}
          href={PATHS.STORE.link}
          btnText={btnTexts('BackToShopping')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<Loading />}>
              {processedItems.map((item) => (
                <CardWrapper key={item.id} className="px-6 py-4">
                  <div className="flex items-end justify-between gap-4 mb-4 max-sm:flex-col sm:items-start">
                    <div className="flex max-sm:w-full max-sm:flex-col gap-2 sm:gap-4">
                      <Image
                        src={'/assets/play-station.webp'}
                        alt={item.title}
                        width={170}
                        height={170}
                        className="rounded-xl max-sm:w-full"
                      />
                      <div className="flex sm:flex-col justify-between py-2">
                        <h2 className="text-xl font-semibold">{item.title}</h2>
                        <p className="text-center text-xs sm:text-sm text-gray-600 font-semibold bg-[var(--enjoy-gray-100)] py-2 px-3 rounded-full">
                          {item.storeName ?? 'المتجر السعودي'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      otherClassName="!text-gray-400 hover:!text-red-500"
                      handleClick={() =>
                        item.id && handleRemoveFromCart(item.id, item.title)
                      }
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border-t border-dotted border-gray-300 pt-4">
                    <div className="flex items-center gap-5">
                      <Button
                        variant="circle"
                        handleClick={() => {
                          const key = item.id ?? item.slug;
                          if (key !== undefined) {
                            updateQuantity(
                              key,
                              Math.max(1, (item.quantity ?? 1) - 1)
                            );
                          }
                        }}
                        bgColor="bg-gray-100"
                        hoverBgColor="bg-gray-200"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </Button>
                      <span className="font-bold">{item.quantity ?? 1}</span>
                      <Button
                        variant="circle"
                        handleClick={() => {
                          const key = item.id ?? item.slug;
                          if (key !== undefined) {
                            updateQuantity(key, (item.quantity ?? 1) + 1);
                          }
                        }}
                        bgColor="bg-gray-900"
                        hoverBgColor="bg-gray-800"
                      >
                        <FaPlus className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                    <span className="text-lg font-bold">
                      {Number(
                        item.parsedPrice * (item.quantity ?? 1)
                      ).toLocaleString()}{' '}
                      {item.parsedCurrency}
                    </span>
                  </div>
                </CardWrapper>
              ))}
            </Suspense>

            {token ? (
              <>
                <MotionSection index={0}>
                  <div className="text-sm font-semibold leading-relaxed">
                    <p>
                      {t.rich('termsAndPrivacyAgreement', {
                        termsLink: (chunks) => (
                          <Link
                            href={PATHS.TERMS_OF_USER.link}
                            className="text-enjoy-primary underline cursor-pointer"
                          >
                            {chunks}
                          </Link>
                        ),
                        privacyLink: (chunks) => (
                          <Link
                            href={PATHS.PRIVACY_POLICY.link}
                            className="text-enjoy-primary underline cursor-pointer"
                          >
                            {chunks}
                          </Link>
                        ),
                      })}
                    </p>
                  </div>
                </MotionSection>

                <MotionSection index={1}>
                  <Button
                    otherClassName="w-full py-3"
                    handleClick={onProceedToPayment}
                  >
                    {btnTexts('CompletePayment')}
                  </Button>
                </MotionSection>
              </>
            ) : (
              <div className="mt-3 text-center">
                <h2 className="mb-5 font-semibold text-xl">
                  {t('loginToPay')}
                </h2>
                <AuthButtons t={btnTexts} />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <MotionSection index={0}>
              <InvoiceSummary items={processedItems} />
            </MotionSection>

            <MotionSection index={1}>
              <CardWrapper
                bgColor="bg-enjoy-secondary-soft"
                className="text-enjoy-secondary flex items-center justify-between gap-2 p-4 !shadow-none"
              >
                <p className="text-sm font-semibold">
                  {t('rewards.pointsEarned', { points })}
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
                    <h3
                      className={`font-semibold mb-2 ${
                        isArabic ? 'text-base' : 'text-sm'
                      }`}
                    >
                      {t('rewards.donation.title')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('rewards.donation.description')}
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
