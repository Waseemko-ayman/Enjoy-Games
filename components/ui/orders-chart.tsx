/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { JSX, useEffect } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  CartesianGrid,
} from 'recharts';
import useAPI from '@/hook/useAPI';
import CardHeaderContent from './display/CardHeader';
import TabsNavigation from './display/TabsNavigation';
import Loading from '../molecules/loading';
import { useTranslations } from 'next-intl';
import ErrorFetching from '../molecules/ErrorFetching';
import { format } from 'date-fns';

interface ChartData {
  name: string;
  ordersCount: number;
  ordersAmount: number;
  paidOrdersCount: number;
  paidOrdersAmount: number;
}

export function OrderChart({
  startDate,
  endDate,
  activeTab,
  setActiveTab,
  dateData,
  addLoading,
}: {
  startDate: Date | undefined;
  endDate: Date | undefined;
  activeTab: string;
  setActiveTab: (value: any) => void;
  dateData: any;
  addLoading: boolean;
}) {
  const t = useTranslations();
  const { get, data, isLoading, error } = useAPI<any>(
    `order/orders-count-statistics`
  );

  useEffect(() => {
    get();
  }, [get]);

  if (isLoading || addLoading) return <Loading />;
  if (error) return <ErrorFetching />;

  const formatCurrency = (value: number) => `${value.toLocaleString()}`;
  const formatNumber = (value: number) => value.toLocaleString();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg text-right">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${
                entry.dataKey.includes('Amount')
                  ? formatCurrency(entry.value)
                  : formatNumber(entry.value)
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getTodayData = (): ChartData[] => {
    if (!data) return [];
    return [
      {
        name: t('BtnTexts.todayLabel'),
        ordersCount: data.today.orders_count || 0,
        ordersAmount: data.today.orders_amount || 0,
        paidOrdersCount: data.today.paid_orders_count || 0,
        paidOrdersAmount: data.today.paid_orders_amount || 0,
      },
    ];
  };

  const getWeeklyData = (): ChartData[] => {
    if (!data) return [];
    return [
      {
        name: t('BtnTexts.lastWeek'),
        ordersCount: data.last_week.orders_count || 0,
        ordersAmount: data.last_week.orders_amount || 0,
        paidOrdersCount: data.last_week.paid_orders_count || 0,
        paidOrdersAmount: data.last_week.paid_orders_amount || 0,
      },
    ];
  };

  const getMonthlyData = (): ChartData[] => {
    if (!data) return [];
    return [
      {
        name: t('BtnTexts.lastWeek'),
        ordersCount: data.last_week?.orders_count || 0,
        ordersAmount: data.last_week?.orders_amount || 0,
        paidOrdersCount: data.last_week?.paid_orders_count || 0,
        paidOrdersAmount: data.last_week?.paid_orders_amount || 0,
      },
      {
        name: t('BtnTexts.lastMonthly'),
        ordersCount: data.last_month?.orders_count || 0,
        ordersAmount: data.last_month?.orders_amount || 0,
        paidOrdersCount: data.last_month?.paid_orders_count || 0,
        paidOrdersAmount: data.last_month?.paid_orders_amount || 0,
      },
    ];
  };

  const getYearlyData = (): ChartData[] => {
    if (!data) return [];
    return [
      {
        name: t('BtnTexts.lastYearly'),
        ordersCount: data.last_year.orders_count || 0,
        ordersAmount: data.last_year.orders_amount || 0,
        paidOrdersCount: data.last_year.paid_orders_count || 0,
        paidOrdersAmount: data.last_year.paid_orders_amount || 0,
      },
    ];
  };

  const getManualData = (): ChartData[] => {
    if (!dateData || !startDate || !endDate) return [];
    return [
      {
        name: `${format(startDate, 'dd-MM-yyyy')} → ${format(
          endDate,
          'dd-MM-yyyy'
        )}`,
        ordersCount: dateData.orders_count || 0,
        ordersAmount: dateData.orders_amount || 0,
        paidOrdersCount: dateData.paid_orders_count || 0,
        paidOrdersAmount: dateData.paid_orders_amount || 0,
      },
    ];
  };

  const tabsData = [
    { value: 'today', label: t('BtnTexts.today') },
    { value: 'weekly', label: t('BtnTexts.weekly') },
    { value: 'monthly', label: t('BtnTexts.monthly') },
    { value: 'yearly', label: t('BtnTexts.yearly') },
    ...(dateData
      ? [{ value: 'custom', label: t('BtnTexts.customRange') }]
      : []),
  ];

  const renderChart = (): JSX.Element => {
    switch (activeTab) {
      case 'today':
        return <BarChart data={getTodayData()} {...commonProps()} />;
      case 'weekly':
        return <BarChart data={getWeeklyData()} {...commonProps()} />;
      case 'monthly':
        return <LineChart data={getMonthlyData()} {...commonLineProps()} />;
      case 'yearly':
        return <BarChart data={getYearlyData()} {...commonProps()} />;
      case 'custom':
        return <BarChart data={getManualData()} {...commonProps()} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p>{t('Dashboard.overview.noData')}</p>
          </div>
        );
    }
  };

  const commonProps = () => ({
    children: (
      <>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatNumber}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="ordersCount"
          name={t('Dashboard.Chart.ordersCount')}
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="paidOrdersCount"
          name={t('Dashboard.Chart.paidOrdersCount')}
          fill="#10b981"
          radius={[4, 4, 0, 0]}
        />
      </>
    ),
  });

  const commonLineProps = () => ({
    children: (
      <>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatCurrency}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="ordersAmount"
          name={t('Dashboard.Chart.ordersAmount')}
          stroke="#3b82f6"
          strokeWidth={3}
          activeDot={{ r: 6 }}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="paidOrdersAmount"
          name={t('Dashboard.Chart.paidOrdersAmount')}
          stroke="#10b981"
          strokeWidth={3}
          activeDot={{ r: 6 }}
          dot={{ r: 4 }}
        />
      </>
    ),
  });

  return (
    <Card className="col-span-4">
      <CardHeaderContent
        title={t('Dashboard.overview.title')}
        description={t('Dashboard.overview.desc')}
      />
      <CardContent className="pl-2">
        <Tabs
          value={activeTab}
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsNavigation tabs={tabsData} />
          <div className="h-[250px] sm:h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
