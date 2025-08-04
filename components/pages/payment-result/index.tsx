'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import StepIndicator from '@/components/molecules/StepIndicator';
import OrderCompleteStep from '../my-cart/Sections/OrderCompleteStep';
import PaymentFailedStep from '../my-cart/Sections/PaymentFailedStep';

const PaymentResultPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order') || '';
  const amountCentsStr = searchParams.get('amount_cents') || '0';
  const currency = searchParams.get('currency') || 'SAR';
  const success = searchParams.get('success') === 'true';

  // Since keys with dots may not be accessible via get(), parse manually:
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('data.message') || '';

  const amountCents = parseInt(amountCentsStr, 10);

  return (
    <>
      <StepIndicator
        steps={[
          { id: 1, key: 'cart', isCompleted: true, isCurrent: false },
          { id: 2, key: 'payment', isCompleted: true, isCurrent: false },
          { id: 3, key: 'complete', isCompleted: true, isCurrent: true },
        ]}
      />

      {success ? (
        <OrderCompleteStep
          orderNumber={orderId}
          amountCents={amountCents}
          currency={currency}
          onReturnToStore={() => (window.location.href = '/store')}
        />
      ) : (
        <PaymentFailedStep
          onRetry={() => (window.location.href = '/store')}
          errorMessage={message}
        />
      )}
    </>
  );
};

export default PaymentResultPage;
