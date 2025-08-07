import React from 'react';
import { ShoppingBag, Clock, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CardWrapper from '../atomic/CardWrapper';
import { OrdersStatsProps } from '@/interfaces';
import GridWrapper from './GridWrapper';
import SectionComponent from '../atomic/SectionComponent';

const OrdersStats: React.FC<OrdersStatsProps> = ({ orders }) => {
  const t = useTranslations('MyPurchases');

  const stats = {
    total: orders.length,
    pending: orders.filter((order) => order.status === 'pending').length,
    completed: orders.filter((order) => order.status === 'completed').length,
    cancelled: orders.filter((order) => order.status === 'cancelled').length,
  };

  const totalSpent = orders.reduce((sum, order) => {
    const price = parseFloat(order.total_price.replace(/[^\d.]/g, ''));
    return sum + price;
  }, 0);

  const statsData = [
    {
      title: t('totalOrders'),
      value: stats.total,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: t('pendingOrders'),
      value: stats.pending,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: t('completedOrders'),
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: t('totalSpent'),
      value: `${totalSpent.toFixed(2)} ر.س.`,
      icon: ShoppingBag,
      color: 'text-enjoy-primary',
      bgColor: 'bg-enjoy-primary/10',
    },
  ];

  return (
    <SectionComponent>
      <GridWrapper otherClassName="gap-5 sm:!pb-0" isScrollable>
        {statsData.map((stat, index) => (
          <CardWrapper className="p-4" key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </CardWrapper>
        ))}
      </GridWrapper>
    </SectionComponent>
  );
};

export default OrdersStats;
