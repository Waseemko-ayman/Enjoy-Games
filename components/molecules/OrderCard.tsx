/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { CreditCard, Tag, Receipt, Calendar } from 'lucide-react';
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

/*
'use client';

import type React from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Package,
  Calendar,
  CreditCard,
  MapPin,
  Eye,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Order {
  id: string;
  order_number: string;
  status: 'pending' | 'completed' | 'cancelled' | 'shipped';
  created_at: string;
  total_price: {
    amount: number;
    currency: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: {
      amount: number;
      currency: string;
    };
    image?: string;
  }>;
  shipping_address?: {
    street: string;
    city: string;
    country: string;
  };
  payment_method?: string;
}

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const t = useTranslations('MyPurchases');

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: {
        icon: Clock,
        variant: 'secondary' as const,
        className: 'bg-amber-50 text-amber-700 border-amber-200',
        label: 'pending',
      },
      completed: {
        icon: CheckCircle,
        variant: 'default' as const,
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        label: 'completed',
      },
      cancelled: {
        icon: XCircle,
        variant: 'destructive' as const,
        className: 'bg-red-50 text-red-700 border-red-200',
        label: 'cancelled',
      },
      shipped: {
        icon: Truck,
        variant: 'default' as const,
        className: 'bg-blue-50 text-blue-700 border-blue-200',
        label: 'shipped',
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // const formatPrice = (amount: number, currency: string) => {
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: currency || 'USD',
  //   }).format(amount);
  // };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="font-semibold text-gray-900">
                #{order?.order_number}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(order?.created_at)}</span>
            </div>
          </div>
          <Badge className={`${statusConfig.className} font-medium px-3 py-1`}>
            <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 text-sm">Order Items</h4>
          <div className="space-y-2">
            {order?.items?.slice(0, 2).map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {item.image && (
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-sm text-gray-900 truncate max-w-[150px]">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-sm text-gray-900">
                  {item.price.amount} {item.price.currency}
                </span>
              </div>
            ))}
            {order?.items.length > 2 && (
              <div className="text-center py-2">
                <span className="text-sm text-gray-500">
                  +{order?.items.length - 2} more items
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CreditCard className="w-4 h-4" />
              <span>Total Amount</span>
            </div>
            <span className="font-bold text-lg text-gray-900">
              {order?.total_price.amount} {order?.total_price.currency}
            </span>
          </div>

          {order?.shipping_address && (
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium">Shipping Address</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {order?.shipping_address.street},{' '}
                  {order?.shipping_address.city},{' '}
                  {order?.shipping_address.country}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-gray-50 border-gray-200 bg-transparent"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-gray-50 border-gray-200 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Invoice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
*/
