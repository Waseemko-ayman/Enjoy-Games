'use client';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import OrderCompleteStep from '@/components/pages/my-cart/Sections/OrderCompleteStep';
import PaymentStep from '@/components/pages/my-cart/Sections/PaymentStep';
import StepIndicator from '@/components/molecules/StepIndicator';
import CartContent from '@/components/pages/my-cart/Sections/CartContent';
import { useCartContext } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PaymentFailedStep from './Sections/PaymentFailedStep';
import { PATHS } from '@/data/paths';

const STEPS = {
  CART: 1,
  PAYMENT: 2,
  COMPLETE: 3,
  FAILED: 4,
};

const MyCartPage = () => {
  const searchParams = useSearchParams();
  const successParam = searchParams.get('success');
  const success = successParam === 'true';

  const orderId = searchParams.get('order') || '';
  const amountCents = parseInt(searchParams.get('amount_cents') || '0', 10);
  const currency = searchParams.get('currency') || 'ر.س.';

  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('data.message') || '';

  const [currentStep, setCurrentStep] = useState(() => {
    const hasPaymentParams =
      searchParams.get('order') &&
      searchParams.get('amount_cents') &&
      searchParams.get('currency') &&
      successParam !== null;

    if (hasPaymentParams && successParam === 'true') return STEPS.COMPLETE;
    if (hasPaymentParams && successParam === 'false') return STEPS.FAILED;
    return STEPS.CART;
  });

  const t = useTranslations('MyCart');
  const btnTexts = useTranslations('BtnTexts');
  const { cartItems, clearCart } = useCartContext();

  const router = useRouter();

  const finalStepKey =
    successParam === 'true'
      ? 'complete'
      : successParam === 'false'
      ? 'failed'
      : 'default';

  const steps = [
    {
      id: 1,
      key: 'cart',
      isCompleted: currentStep > STEPS.CART,
      isCurrent: currentStep === STEPS.CART,
    },
    {
      id: 2,
      key: 'payment',
      isCompleted: currentStep > STEPS.PAYMENT,
      isCurrent: currentStep === STEPS.PAYMENT,
    },
    {
      id: 3,
      key: finalStepKey,
      isCompleted:
        currentStep === STEPS.COMPLETE || currentStep === STEPS.FAILED,
      isCurrent: currentStep === STEPS.COMPLETE || currentStep === STEPS.FAILED,
    },
  ];

  const handleProceedToPayment = () => {
    setCurrentStep(STEPS.PAYMENT);
  };

  const handleOrderComplete = () => {
    clearCart();
    router.push(PATHS.STORE.link);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price?.amount ?? 0) * (item.quantity ?? 1),
    0
  );

  return (
    <div>
      <StepIndicator steps={steps} success={success} />

      {currentStep === STEPS.CART &&
        (cartItems.length > 0 ? (
          <CartContent
            items={cartItems}
            onProceedToPayment={handleProceedToPayment}
          />
        ) : (
          <EmptyStateBox
            imageSrc="/assets/empty-status.png"
            alt="empty-status"
            title={t('emptyStateTitle')}
            buttonText={btnTexts('StartMarketingNow')}
            btnlink="/store"
          />
        ))}

      {currentStep === STEPS.PAYMENT && (
        <PaymentStep
          items={cartItems}
          onBackToCart={() => setCurrentStep(STEPS.CART)}
          totalAmount={totalAmount}
        />
      )}

      {currentStep === STEPS.COMPLETE && (
        <OrderCompleteStep
          orderNumber={orderId}
          amountCents={amountCents}
          currency={currency}
          onReturnToStore={handleOrderComplete}
        />
      )}

      {currentStep === STEPS.FAILED && (
        <PaymentFailedStep
          onRetry={handleOrderComplete}
          errorMessage={message}
        />
      )}
    </div>
  );
};

export default MyCartPage;
