import React, { useState } from 'react';
import Link from 'next/link';
import { Minus, Trash2 } from 'lucide-react';
import { FaPlus, FaStar } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { PATHS } from '@/data/paths';
import { useCartContext } from '@/context/CartContext';
import { useAuthContext } from '@/context/AuthContext';
import SubCartHeader from '@/components/molecules/SubCartHeader';
import Container from '@/components/organism/Container';
import Button from '@/components/atomic/Button';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import Layer from '@/components/atomic/Layer';
import { ProductCardProps } from '@/interfaces';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { useToast } from '@/lib/toast';
import AuthButtons from '@/components/organism/MobileHeader/PopupMenu/Sections/AuthButtons';
import Loading from '@/components/molecules/loading';
import InvoiceSummary from '@/components/molecules/InvoiceSummary';
import ResponsiveDialogDrawer from '@/components/organism/ResponsiveDialogDrawer';
import useIsMobile from '@/hook/useIsMobile';
import { extractText } from '@/utils/extractText';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { API_IMAGE_URL } from '@/config/api';
import Input from '@/components/atomic/Input';
import dynamic from 'next/dynamic';
import { DeleteWarningContent } from '@/components/molecules/DeleteWarningContent';
const Image = dynamic(() => import('next/image'), {
  loading: () => <Loading />,
});
const CardWrapper = dynamic(() => import('@/components/atomic/CardWrapper'), {
  loading: () => <Loading />,
});

type FormValues = {
  agreeToTerms: boolean;
};

interface CartContentProps {
  items: ProductCardProps[];
  onProceedToPayment: () => void;
}

const CartContent: React.FC<CartContentProps> = ({
  items,
  onProceedToPayment,
}) => {
  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();
  const { isArabic } = useToggleLocale();
  const { showToast } = useToast();
  const { removeFromCart, updateQuantity } = useCartContext();

  const t = useTranslations();
  const btnTexts = useTranslations('BtnTexts');
  const msgTxts = useTranslations('Messages');

  const { token } = useAuthContext();
  const points = 1000;

  const handleRemoveFromCart = (id: number, title: string) => {
    removeFromCart(id);
    showToast(`${title} ${msgTxts('removedFromCart')}`);
  };

  const schema = yup.object({
    agreeToTerms: yup
      .boolean()
      .required()
      .oneOf(
        [true],
        t('Inputs.errorsMsgs.termsAccepted') ||
          'You must accept the terms and privacy policy'
      ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { agreeToTerms: false },
  });

  const onSubmit = () => {
    // إذا تحقق الشرط (checkbox مفعّل)
    onProceedToPayment();
  };

  return (
    <Layer otherClassName="!my-12 max-sm:!mb-28">
      <Container>
        <SubCartHeader
          title={t('MyCart.basketSummary')}
          href={PATHS.STORE.link}
          btnText={btnTexts('BackToShopping')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <CardWrapper key={item.id} className="px-6 py-4">
                <div className="flex items-end justify-between gap-3 mb-4 max-sm:flex-col sm:items-start">
                  <div className="flex max-sm:w-full max-sm:flex-col gap-2 sm:gap-4">
                    <Image
                      src={
                        `${API_IMAGE_URL}${item.image}` ||
                        '/assets/play-station.webp'
                      }
                      alt={item.title}
                      width={170}
                      height={170}
                      className="rounded-xl max-sm:w-full"
                    />
                    <div className="space-y-2 py-2 gap-2">
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p className="text-xs text-gray-600 font-semibold">
                        {extractText(item.description)}
                      </p>
                    </div>
                  </div>
                  <ResponsiveDialogDrawer
                    trigger={
                      <Button
                        variant="ghost"
                        otherClassName="!text-gray-400 hover:!text-red-500"
                        handleClick={() => setOpen(true)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    }
                    open={open}
                    setOpen={setOpen}
                    isMobile={isMobile}
                  >
                    <DeleteWarningContent
                      msgTxts={msgTxts}
                      btnTexts={btnTexts}
                      onCancel={() => setOpen(false)}
                      onDelete={() => {
                        if (item.id) {
                          handleRemoveFromCart(item.id, item.title);
                          setOpen(false);
                        }
                      }}
                    />
                  </ResponsiveDialogDrawer>
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
                    {((item.price?.amount ?? 0) * (item.quantity ?? 1)).toFixed(
                      2
                    )}{' '}
                    {item.price?.currency}
                  </span>
                </div>
              </CardWrapper>
            ))}

            {token ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <MotionSection index={0}>
                  <div className="mb-5">
                    <div className="flex items-center text-sm font-semibold leading-relaxed">
                      <Input
                        type="checkbox"
                        inputName="agreeToTerms"
                        control={control}
                      />
                      <p>
                        {t.rich('MyCart.termsAndPrivacyAgreement', {
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
                    {errors.agreeToTerms && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.agreeToTerms.message}
                      </p>
                    )}
                  </div>
                </MotionSection>

                <MotionSection index={1}>
                  <Button
                    otherClassName="w-full py-3"
                    handleClick={handleSubmit((data) => {
                      if (data.agreeToTerms) {
                        onProceedToPayment();
                      }
                    })}
                  >
                    {btnTexts('CompletePayment')}
                  </Button>
                </MotionSection>
              </form>
            ) : (
              <div className="mt-3 text-center">
                <h2 className="mb-5 font-semibold text-xl">
                  {t('MyCart.loginToPay')}
                </h2>
                <AuthButtons t={btnTexts} />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <MotionSection index={0}>
              <InvoiceSummary items={items} />
            </MotionSection>

            <MotionSection index={1}>
              <CardWrapper
                bgColor="bg-enjoy-secondary-soft"
                className="text-enjoy-secondary flex items-center justify-between gap-2 p-4 !shadow-none"
              >
                <p className="text-sm font-semibold">
                  {t('MyCart.rewards.pointsEarned', { points })}
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
                      {t('MyCart.rewards.donation.title')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('MyCart.rewards.donation.description')}
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
