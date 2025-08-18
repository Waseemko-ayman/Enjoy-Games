/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type React from 'react';
import GridWrapper from './GridWrapper';
import { useTranslations } from 'next-intl';
import SectionComponent from '../atomic/SectionComponent';
import CardWrapper from '../atomic/CardWrapper';
import { CheckCircle, Clock, ShoppingBag } from 'lucide-react';

interface OrdersStatsProps {
  orders: any[];
}

const OrdersStats: React.FC<OrdersStatsProps> = ({ orders }) => {
  const t = useTranslations('MyPurchases');

  const stats = {
    total: orders.length,
    pending: orders.filter((order) => order.status === 'pending').length,
    completed: orders.filter((order) => order.status === 'completed').length,
    cancelled: orders.filter((order) => order.status === 'cancelled').length,
  };

  const totalSpent = orders.reduce((sum, order) => {
    return sum + order.total_price.amount;
  }, 0);

  const statsData = [
    {
      title: t('ordersTotal'),
      value: stats.total,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
    },
    {
      title: t('pendingOrders'),
      value: stats.pending,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
      borderColor: 'border-amber-200',
    },
    {
      title: t('completedOrders'),
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
    },
    {
      title: t('totalSpent'),
      value: `${totalSpent.toFixed(2)}`,
      icon: ShoppingBag,
      color: 'text-enjoy-primary',
      bgColor: 'bg-gradient-to-br from-enjoy-primary/5 to-enjoy-primary/15',
      borderColor: 'border-gray-50',
    },
  ];

  return (
    <SectionComponent>
      <GridWrapper otherClassName="gap-6 sm:!pb-0" isScrollable>
        {statsData.map((stat, index) => (
          <CardWrapper
            className={`p-4 hover:shadow-lg transition-all duration-300 border ${stat.borderColor} ${stat.bgColor}`}
            key={index}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-white/60 shadow-sm`}>
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
