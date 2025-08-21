import CardWrapper from '@/components/atomic/CardWrapper';
import { CardTitle } from '@/components/ui/card';
import { OrderItem } from '@/interfaces';
import {
  Badge,
  FileText,
  Mail,
  MessageCircle,
  Package,
  Tag,
  Truck,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FaTruck, FaUser } from 'react-icons/fa6';
import { IoBarcodeSharp } from 'react-icons/io5';

const OrderProductCard = ({ item }: { item: OrderItem }) => {
  const t = useTranslations();
  const methodsT = useTranslations('Inputs.labels');

  const iconStyle = 'w-3 h-3';

  const parseShippingData = (shippingData: string) => {
    try {
      return JSON.parse(shippingData);
    } catch {
      return {};
    }
  };

  // const shippingData = parseShippingData(item.shipping_data);
  const hasDiscount = Number.parseFloat(item.discount) > 0;

  const getShippingMethodLabel = (method: string) => {
    const methods: Record<string, string> = {
      code: methodsT('code'),
      account_id: methodsT('accountId'),
      multi_id: methodsT('multiId'),
      access: methodsT('access'),
    };
    return methods[method] || method.charAt(0).toUpperCase() + method.slice(1);
  };

  const getShippingMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      code: 'bg-blue-100 text-blue-800',
      account_id: 'bg-green-100 text-green-800',
      multi_id: 'bg-yellow-100 text-yellow-800',
      access: 'bg-purple-100 text-purple-800',
    };
    return colors[method] || 'bg-gray-100 text-gray-800';
  };

  const getShippingDataIcon = (shippingData?: string) => {
    if (!shippingData) return <MessageCircle className={iconStyle} />;

    switch (shippingData.toLowerCase()) {
      case 'code':
        return <IoBarcodeSharp className={iconStyle} />;
      case 'email':
        return <Mail className="h-3 w-3" />;
      case 'account_id':
        return <FaTruck className={iconStyle} />;
      case 'multi_id':
        return <Package className={iconStyle} />;
      case 'access':
        return <FaUser className={iconStyle} />;
      default:
        return <MessageCircle className={iconStyle} />;
    }
  };

  return (
    <CardWrapper key={item.id} className="p-5">
      <div className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              {item.product_title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t('Invoice.summary.itemId')}: {item.id}
            </p>
          </div>
          <Badge
            className={`${getShippingMethodColor(
              item.shipping_method
            )} border-0`}
          >
            {getShippingMethodLabel(item.shipping_method)}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {/* Pricing Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {t('productDetails.quantity')}:
            </span>
            <span className="font-medium">{item.quantity}</span>
          </div>
          {hasDiscount && (
            <div className="flex justify-between items-center text-green-600">
              <span className="text-sm flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {t('Invoice.summary.discount.label')}:
              </span>
              <span className="font-medium">
                -{item.discount} {item.currency_code}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              {t('Invoice.summary.total.label')}:
            </span>
            <span className="font-bold text-lg text-primary">
              {item.total_price} {item.currency_code}
            </span>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Truck className="h-4 w-4" />
            {methodsT('shipping_method')}
          </div>
          {item.shipping_data && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {getShippingDataIcon(item.shipping_method)}
              {item.shipping_method === 'code'
                ? parseShippingData(item.shipping_data).email
                : item.shipping_data}
            </div>
          )}
        </div>

        {/* Proof File */}
        {item.proof_file && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <FileText className="h-4 w-4" />
              {t('productDetails.proofFile')}
            </div>
            <div className="text-sm text-muted-foreground bg-muted/20 p-2 rounded">
              {item.proof_file}
            </div>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default OrderProductCard;
