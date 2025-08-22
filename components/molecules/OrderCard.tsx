/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { CreditCard, Tag, Receipt, Calendar, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CardWrapper from '../atomic/CardWrapper';
import Button from '../atomic/Button';
import { Order } from '@/interfaces';
import { getStatusColor, getStatusIcon } from '@/utils/statusHelpers';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/data/paths';
import useAPI from '@/hook/useAPI';
import { useToast } from '@/lib/toast';
import ButtonLoading from '../atomic/ButtonLoading';

const OrderCard = ({ order }: { order: Order }) => {
  const t = useTranslations('MyPurchases');
  const router = useRouter();
  const { showToast } = useToast();

  // API hooks
  const { add: payOrder, isLoading } = useAPI<PaymentRequest, any>('order/pay');

  const handleOrderPay = async (order: Order) => {
    try {
      const paymentPayload = {
        order_id: order.id,
        payment_gateway: 'paymob',
      };
      const paymentData = await payOrder(paymentPayload as any);
      const payUrl = paymentData?.data?.payment_url ?? '';
      if (payUrl) {
        window.location.href = payUrl;
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? t('paymentFailed');
      showToast(msg, 'error');
      console.error(err);
    }
  };

  return (
    <CardWrapper className="hover:shadow-lg transition-all duration-300">
      <div className="pb-3 bg-gradient-to-r from-gray-50 to-gray-100/50 px-6 py-4 border-b border-gray-100 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-enjoy-primary/10 rounded-lg group-hover:bg-enjoy-primary/20 transition-colors">
              <Receipt className="w-5 h-5 text-enjoy-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {t('orderNumber')} #{order.id}
              </h3>
              {/* Calendar */}
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString('en-SA')}
              </p>
            </div>
          </div>
          <CardWrapper
            className={`${getStatusColor(
              order.status
            )} flex items-center justify-center gap-2 font-medium px-3 py-1 text-xs !shadow-none`}
          >
            <span>{getStatusIcon(order.status)}</span>
            {t(order.status)}
          </CardWrapper>
        </div>
      </div>

      <div className="p-2 md:p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {t('totalPrice')}
                </span>
              </div>
              <span className="font-bold text-base sm:text-lg">
                {order.total_price.amount} {order.total_price.currency}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-600" />
                <span className="text-sm sm:text-xs font-medium text-green-700">
                  {t('discount')}
                </span>
              </div>
              <span className="font-semibold text-green-700">
                {order.discount?.amount && order.discount.amount > 0
                  ? `-${order.discount.amount} ${order.discount.currency}`
                  : `0 ${order.discount.currency}`}
              </span>
            </div>
            {/* {order.discount.amount !== 0 && (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-green-600" />
                  <span className="text-sm sm:text-xs font-medium text-green-700">
                    {t('discount')}
                  </span>
                </div>
                <span className="font-semibold text-green-700">
                  -{order.discount?.amount} {order.discount.currency}
                </span>
              </div>
            )} */}
          </div>

          <div className="flex flex-col justify-center">
            <div className="text-center p-4 bg-gradient-to-r from-enjoy-primary/5 to-enjoy-primary/10 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{t('finalAmount')}</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-enjoy-primary">
                {order.total_price.amount} {order.total_price.currency}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              otherClassName="text-enjoy-primary font-medium text-sm"
              handleClick={() =>
                router.push(PATHS.MY_PURCHASES.ITEM(order.id).link)
              }
            >
              {t('viewDetails')}
              <ChevronRight className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              {/* {order.status === 'pending' && (
                <Button otherClassName="px-3 py-1 text-xs rounded-full">
                  {t('cancel')}
                </Button>
              )} */}
              {order.status === 'pending' && (
                <Button
                  otherClassName="px-3 py-1 text-xs rounded-full"
                  handleClick={() => handleOrderPay(order)}
                >
                  {isLoading ? <ButtonLoading /> : t('reorder')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default OrderCard;
