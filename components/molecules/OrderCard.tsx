import React from 'react';
import { CreditCard, Tag, Receipt } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CardWrapper from '../atomic/CardWrapper';
import Button from '../atomic/Button';
import { Order } from '@/interfaces';

const OrderCard = ({ order }: { order: Order }) => {
  const t = useTranslations('MyPurchases');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '⏳';
      case 'completed':
        return '✅';
      case 'paid':
        return '💳';
      case 'cancelled':
        return '❌';
      case 'processing':
        return '🔄';
      default:
        return '📋';
    }
  };

  return (
    <CardWrapper className="p-2 md:p-3 hover:shadow-lg transition-all duration-300">
      <div className="pb-3">
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
              {/* <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString('en-SA')}
              </p> */}
            </div>
          </div>
          <CardWrapper
            className={`${getStatusColor(
              order.status
            )} font-medium px-3 py-1 text-xs !shadow-none`}
          >
            <span>{getStatusIcon(order.status)}</span>
            {t(order.status)}
          </CardWrapper>
        </div>
      </div>

      <div className="pt-0">
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
                {order.total_price}
              </span>
            </div>

            {order.discount !== '0.00 ر.س.' && (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-green-600" />
                  <span className="text-sm sm:text-xs font-medium text-green-700">
                    {t('discount')}
                  </span>
                </div>
                <span className="font-semibold text-green-700">
                  -{order.discount}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className="text-center p-4 bg-gradient-to-r from-enjoy-primary/5 to-enjoy-primary/10 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{t('finalAmount')}</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-enjoy-primary">
                {order.total_price}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              otherClassName="text-enjoy-primary font-medium text-sm"
            >
              {t('viewDetails')}
            </Button>
            <div className="flex gap-2">
              {order.status === 'pending' && (
                <Button otherClassName="px-3 py-1 text-xs rounded-full">
                  {t('cancel')}
                </Button>
              )}
              <Button otherClassName="px-3 py-1 text-xs rounded-full">
                {t('reorder')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default OrderCard;
