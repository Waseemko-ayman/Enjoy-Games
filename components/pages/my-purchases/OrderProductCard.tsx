import CardWrapper from '@/components/atomic/CardWrapper';
import { CardTitle } from '@/components/ui/card';
import { OrderItem } from '@/interfaces';
import { Badge, FileText, Tag, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const OrderProductCard = ({ item }: { item: OrderItem }) => {
  const t = useTranslations();
  const methodsT = useTranslations('Inputs.labels');

  const parseShippingData = (shippingData: string) => {
    try {
      return JSON.parse(shippingData);
    } catch {
      return {};
    }
  };

  const renderShippingData = (method: string, shippingData: string) => {
    if (!shippingData) return null;
    const data = parseShippingData(shippingData);

    switch (method) {
      case 'code':
        return data?.email ?? shippingData;
      case 'access':
        return (
          <div className="space-y-1 text-sm text-muted-foreground">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="font-medium">{key}:</span>
                <span>{String(value)}</span>
              </div>
            ))}
          </div>
        );
      case 'multi_id':
        return (
          <div className="space-y-1 text-sm text-muted-foreground">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="font-medium">{key}:</span>
                <span>{String(value)}</span>
              </div>
            ))}
          </div>
        );
      case 'account_id':
        return data?.account_id ?? shippingData;
      default:
        return shippingData;
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

  // const getShippingDataIcon = (shippingData?: string) => {
  //   if (!shippingData) return <MessageCircle className="w-3 h-3" />;

  //   switch (shippingData.toLowerCase()) {
  //     case 'code':
  //       return <IoBarcodeSharp className="w-3 h-3" />;
  //     case 'email':
  //       return <Mail className="h-3 w-3" />;
  //     case 'account_id':
  //       return <FaTruck className="w-3 h-3" />;
  //     case 'multi_id':
  //       return <Package className="w-3 h-3" />;
  //     case 'access':
  //       return <FaUser className="w-3 h-3" />;
  //     default:
  //       return <MessageCircle className="w-3 h-3" />;
  //   }
  // };

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
              {/* {getShippingDataIcon(item.shipping_method)} */}
              {renderShippingData(item.shipping_method, item.shipping_data)}
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
