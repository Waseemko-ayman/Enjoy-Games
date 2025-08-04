'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import StepIndicator from '@/components/molecules/StepIndicator';
import OrderCompleteStep from '../my-cart/Sections/OrderCompleteStep';
import PaymentFailedStep from '../my-cart/Sections/PaymentFailedStep';

const PaymentResultPage = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const orderNumber = searchParams.get('orderNumber') || '';

  // لإدارة الخطوات
  // const STEPS = { CART: 1, PAYMENT: 2, COMPLETE: 3 };
  // const [currentStep, setCurrentStep] = useState(STEPS.COMPLETE);

  return (
    <>
      <StepIndicator
        steps={[
          { id: 1, key: 'cart', isCompleted: true, isCurrent: false },
          { id: 2, key: 'payment', isCompleted: true, isCurrent: false },
          { id: 3, key: 'complete', isCompleted: true, isCurrent: true },
        ]}
      />

      {status === 'paid' ? (
        <OrderCompleteStep
          orderNumber={orderNumber}
          onReturnToStore={() => (window.location.href = '/store')}
        />
      ) : (
        <PaymentFailedStep onRetry={() => (window.location.href = '/store')} />
      )}
    </>
  );
};

export default PaymentResultPage;
