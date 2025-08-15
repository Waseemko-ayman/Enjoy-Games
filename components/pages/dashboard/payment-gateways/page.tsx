'use client';
import PageTitle from '@/components/ui/common/PageTitle';
import TabsNavigation from '@/components/ui/display/TabsNavigation';
import { Tabs } from '@/components/ui/tabs';
import StripeSettings from './Sections/StripeSettings';
import PayPalSettings from './Sections/PayPalSettings';
import BankTransferSettings from './Sections/BankTransferSettings';
import Layer from '@/components/atomic/Layer';

const PaymentGatewaysPage = () => {
  const tabsData = [
    { value: 'stripe', label: 'Stripe' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank', label: 'Bank Transfer' },
  ];

  return (
    <Layer>
      <PageTitle
        title="Payment Gateways"
        description="Configure and manage your payment gateway integrations"
      />
      <Tabs defaultValue="stripe" className="w-full">
        <TabsNavigation tabs={tabsData} />
        <StripeSettings value="stripe" />
        <PayPalSettings value="paypal" />
        <BankTransferSettings value="bank" />
      </Tabs>
    </Layer>
  );
};

export default PaymentGatewaysPage;
