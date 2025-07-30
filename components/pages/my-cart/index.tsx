'use client';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import OrderCompleteStep from '@/components/molecules/OrderCompleteStep';
import PaymentStep from '@/components/molecules/PaymentStep';
import StepIndicator from '@/components/molecules/StepIndicator';
import CartContent from '@/components/organism/CartContent';
import { useCartContext } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const STEPS = {
  CART: 1,
  PAYMENT: 2,
  COMPLETE: 3,
};

const MyCartPage = () => {
  const t = useTranslations('MyCart');
  const btnTexts = useTranslations('BtnTexts');

  const [currentStep, setCurrentStep] = useState(STEPS.CART);
  const { cartItems, clearCart } = useCartContext();

  const [orderNumber] = useState('DL' + Math.random().toString().substr(2, 8));
  const [quantity, setQuantity] = useState(1);

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
      key: 'complete',
      isCompleted: currentStep > STEPS.COMPLETE,
      isCurrent: currentStep === STEPS.COMPLETE,
    },
  ];

  const handleProceedToPayment = () => {
    setCurrentStep(STEPS.PAYMENT);
  };

  const handlePaymentComplete = () => {
    setCurrentStep(STEPS.COMPLETE);
  };

  const handleOrderComplete = () => {
    clearCart();
    setCurrentStep(STEPS.CART);
  };

  const handleBackToCart = () => {
    setCurrentStep(STEPS.CART);
  };

  // Handle gift flow
  // const handleSendAsGift = () => {
  //   console.log('Send as gift functionality');
  // };

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  return (
    <div>
      {/* Step Indicator */}
      <StepIndicator steps={steps} />

      {/* Step Content */}
      {currentStep === STEPS.CART && (
        <>
          {cartItems.length > 0 ? (
            <CartContent
              items={cartItems}
              quantity={quantity}
              setQuantity={setQuantity}
              onProceedToPayment={handleProceedToPayment}
              // onSendAsGift={handleSendAsGift}
            />
          ) : (
            <EmptyStateBox
              imageSrc="/assets/empty-status.png"
              alt="empty-status"
              title={t('emptyStateTitle')}
              buttonText={btnTexts('StartMarketingNow')}
              btnlink="/store"
            />
          )}
        </>
      )}

      {currentStep === STEPS.PAYMENT && (
        <PaymentStep
          items={cartItems}
          quantity={quantity}
          onPaymentComplete={handlePaymentComplete}
          onBackToCart={handleBackToCart}
          totalAmount={totalAmount}
        />
      )}

      {currentStep === STEPS.COMPLETE && (
        <OrderCompleteStep
          onReturnToStore={handleOrderComplete}
          orderNumber={orderNumber}
        />
      )}
    </div>
  );
};

export default MyCartPage;
