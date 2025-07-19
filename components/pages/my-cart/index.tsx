'use client';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import OrderCompleteStep from '@/components/molecules/OrderCompleteStep';
import PaymentStep from '@/components/molecules/PaymentStep';
import StepIndicator from '@/components/molecules/StepIndicator';
import CartContent from '@/components/organism/CartContent';
import React, { useState } from 'react';

interface CartItemData {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  currencyImage: string;
  storeLabel: string;
}

const STEPS = {
  CART: 1,
  PAYMENT: 2,
  COMPLETE: 3,
};

const MyCartPage = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.CART);
  const [cartItems, setCartItems] = useState<CartItemData[]>([
    {
      id: 1,
      title: 'إيتالي 100',
      price: 100,
      quantity: 1,
      image: 'games-banners/fc24-banner.webp',
      currencyImage: 'saudi_riyal.png',
      storeLabel: 'المتجر السعودي',
    },
  ]);
  const [orderNumber] = useState('DL' + Math.random().toString().substr(2, 8));
  const [quantity, setQuantity] = useState(cartItems[0]?.quantity || 1);

  const steps = [
    {
      id: 1,
      title: 'سلة التسوق',
      isCompleted: currentStep > STEPS.CART,
      isCurrent: currentStep === STEPS.CART,
    },
    {
      id: 2,
      title: 'الدفع',
      isCompleted: currentStep > STEPS.PAYMENT,
      isCurrent: currentStep === STEPS.PAYMENT,
    },
    {
      id: 3,
      title: 'إتمام الطلب',
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
    setCartItems([]);
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
    (total, item) => total + item.price * item.quantity,
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
              title="سلتك جاهزة وتناديك للتسوق"
              buttonText="ابدأ بالتسوق الأن"
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
