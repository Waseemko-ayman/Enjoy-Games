/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { JSX, useEffect } from 'react';
import {
  Bar,
  BarChart,
  ComposedChart,
  Line,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import useAPI from '@/hook/useAPI';
import Loading from '../molecules/loading';
import ErrorFetching from '../molecules/ErrorFetching';
import TabsNavigation from './display/TabsNavigation';
import CardHeaderContent from './display/CardHeader';

interface ChartData {
  name: string;
  ordersCount: number;
  paidOrdersCount: number;
  ordersAmount: number;
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

  const colorMap: Record<string, string> = {
    ordersCount: '#6366f1',
    paidOrdersCount: '#06b6d4',
    ordersAmount: '#10b981',
    paidOrdersAmount: '#f59e0b',
    weeklyOrdersCount: '#f59e0b',
    weeklyPaidOrdersCount: '#3b82f6',
    weeklyOrdersAmount: '#10b981',
    weeklyPaidOrdersAmount: '#8b5cf6',
    monthlyOrdersCount: '#f59e0b',
    monthlyPaidOrdersCount: '#8b5cf6',
    monthlyOrdersAmount: '#3b82f6',
    monthlyPaidOrdersAmount: '#10b981',
    yearlyOrdersCount: '#8b5cf6',
    yearlyPaidOrdersCount: '#14b8a6',
    yearlyOrdersAmount: '#3b82f6',
    yearlyPaidOrdersAmount: '#f59e0b',
    customOrdersCount: '#f97316',
    customPaidOrdersCount: '#84cc16',
    customOrdersAmount: '#3b82f6',
    customPaidOrdersAmount: '#8b5cf6',
  };

  const getTooltipKey = (key: string) => {
    switch (activeTab) {
      case 'weekly':
        return `weekly${key.charAt(0).toUpperCase() + key.slice(1)}`;
      case 'monthly':
        return `monthly${key.charAt(0).toUpperCase() + key.slice(1)}`;
      case 'yearly':
        return `yearly${key.charAt(0).toUpperCase() + key.slice(1)}`;
      case 'custom':
        return `custom${key.charAt(0).toUpperCase() + key.slice(1)}`;
      default:
        return key;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg text-right">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => {
            return (
              <p
                key={index}
                style={{
                  color: colorMap[getTooltipKey(entry.dataKey)] || '#000',
                }}
                className="text-sm font-medium"
              >
                {`${entry.name}: ${
                  entry.dataKey.includes('Amount')
                    ? formatCurrency(entry.value)
                    : formatNumber(entry.value)
                }`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const getTodayData = (): ChartData[] =>
    data
      ? [
          {
            name: t('BtnTexts.todayLabel'),
            ordersCount: data.today.orders_count || 0,
            ordersAmount: data.today.orders_amount || 0,
            paidOrdersCount: data.today.paid_orders_count || 0,
            paidOrdersAmount: data.today.paid_orders_amount || 0,
          },
        ]
      : [];

  const getWeeklyData = (): ChartData[] =>
    data
      ? [
          {
            name: t('BtnTexts.lastWeek'),
            ordersCount: data.last_week.orders_count || 0,
            ordersAmount: data.last_week.orders_amount || 0,
            paidOrdersCount: data.last_week.paid_orders_count || 0,
            paidOrdersAmount: data.last_week.paid_orders_amount || 0,
          },
        ]
      : [];

  const getMonthlyData = (): ChartData[] =>
    data
      ? [
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
        ]
      : [];

  const getYearlyData = (): ChartData[] =>
    data
      ? [
          {
            name: t('BtnTexts.lastYearly'),
            ordersCount: data.last_year.orders_count || 0,
            ordersAmount: data.last_year.orders_amount || 0,
            paidOrdersCount: data.last_year.paid_orders_count || 0,
            paidOrdersAmount: data.last_year.paid_orders_amount || 0,
          },
        ]
      : [];

  const getManualData = (): ChartData[] => {
    if (!dateData) return [];

    const name =
      startDate && endDate
        ? `${format(startDate, 'dd-MM-yyyy')} → ${format(
            endDate,
            'dd-MM-yyyy'
          )}`
        : t('Dashboard.Chart.custom');

    return [
      {
        name,
        ordersCount: dateData.orders_count ?? 0,
        ordersAmount: dateData.orders_amount ?? 0,
        paidOrdersCount: dateData.paid_orders_count ?? 0,
        paidOrdersAmount: dateData.paid_orders_amount ?? 0,
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
        return (
          <BarChart width={800} height={300} data={getTodayData()}>
            {getTodayChartContent()}
          </BarChart>
        );
      case 'weekly':
        return (
          <BarChart width={800} height={300} data={getWeeklyData()}>
            {getWeeklyChartContent()}
          </BarChart>
        );
      case 'monthly':
        return (
          <ComposedChart width={800} height={300} data={getMonthlyData()}>
            {getMonthlyChartContent()}
          </ComposedChart>
        );
      case 'yearly':
        return (
          <ComposedChart width={800} height={300} data={getYearlyData()}>
            {getYearlyChartContent()}
          </ComposedChart>
        );
      case 'custom':
        return (
          <ComposedChart width={800} height={300} data={getManualData()}>
            {getCustomChartContent()}
          </ComposedChart>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p>{t('Dashboard.overview.noData')}</p>
          </div>
        );
    }
  };

  /** Chart contents with updated colors */
  const getTodayChartContent = () => (
    <>
      <defs>
        <linearGradient id="todayOrdersGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#a855f7" stopOpacity={0.6} />
        </linearGradient>
        <linearGradient id="todayPaidGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
          <stop offset="50%" stopColor="#0891b2" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#0e7490" stopOpacity={0.6} />
        </linearGradient>
        <linearGradient
          id="todayOrdersAmountGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
          <stop offset="50%" stopColor="#059669" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#047857" stopOpacity={0.6} />
        </linearGradient>
        <linearGradient
          id="todayPaidAmountGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
          <stop offset="50%" stopColor="#d97706" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#b45309" stopOpacity={0.6} />
        </linearGradient>
        <filter id="todayShadow">
          <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodOpacity="0.15" />
        </filter>
      </defs>
      <CartesianGrid
        strokeDasharray="5 5"
        vertical={false}
        stroke="#e2e8f0"
        strokeWidth={1}
      />
      <XAxis
        dataKey="name"
        stroke="#475569"
        fontSize={13}
        fontWeight={600}
        tickLine={false}
        axisLine={false}
      />
      <YAxis
        stroke="#475569"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={formatNumber}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar
        dataKey="ordersCount"
        name={t('Dashboard.Chart.ordersCount')}
        fill="url(#todayOrdersGradient)"
        radius={[12, 12, 0, 0]}
        stroke="#6366f1"
        strokeWidth={1}
        filter="url(#todayShadow)"
      />
      <Bar
        dataKey="paidOrdersCount"
        name={t('Dashboard.Chart.paidOrdersCount')}
        fill="url(#todayPaidGradient)"
        radius={[12, 12, 0, 0]}
        stroke="#06b6d4"
        strokeWidth={1}
        filter="url(#todayShadow)"
      />
      <Bar
        dataKey="ordersAmount"
        name={t('Dashboard.Chart.ordersAmount')}
        fill="url(#todayOrdersAmountGradient)"
        radius={[12, 12, 0, 0]}
        stroke="#10b981"
        strokeWidth={1}
        filter="url(#todayShadow)"
      />
      <Bar
        dataKey="paidOrdersAmount"
        name={t('Dashboard.Chart.paidOrdersAmount')}
        fill="url(#todayPaidAmountGradient)"
        radius={[12, 12, 0, 0]}
        stroke="#f59e0b"
        strokeWidth={1}
        filter="url(#todayShadow)"
      />
    </>
  );

  const getWeeklyChartContent = () => (
    <>
      <defs>
        <linearGradient id="weeklyOrdersGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#d97706" stopOpacity={0.4} />
        </linearGradient>
        <linearGradient id="weeklyPaidGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#dc2626" stopOpacity={0.4} />
        </linearGradient>
        <linearGradient
          id="weeklyOrdersAmountGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#059669" stopOpacity={0.4} />
        </linearGradient>
        <linearGradient
          id="weeklyPaidAmountGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.4} />
        </linearGradient>
        <filter id="weeklyShadow">
          <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodOpacity="0.1" />
        </filter>
      </defs>
      <CartesianGrid strokeDasharray="1 3" stroke="#f1f5f9" strokeWidth={1} />
      <XAxis
        dataKey="name"
        stroke="#64748b"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis
        stroke="#64748b"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={formatNumber}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar
        dataKey="ordersCount"
        name={t('Dashboard.Chart.ordersCount')}
        fill="url(#weeklyOrdersGradient)"
        radius={[8, 8, 0, 0]}
        stroke="#f59e0b"
        strokeWidth={1}
        filter="url(#weeklyShadow)"
      />
      <Bar
        dataKey="paidOrdersCount"
        name={t('Dashboard.Chart.paidOrdersCount')}
        fill="url(#weeklyPaidGradient)"
        radius={[8, 8, 0, 0]}
        stroke="#ef4444"
        strokeWidth={1}
        filter="url(#weeklyShadow)"
      />
      <Bar
        dataKey="ordersAmount"
        name={t('Dashboard.Chart.ordersAmount')}
        fill="url(#weeklyOrdersAmountGradient)"
        radius={[8, 8, 0, 0]}
        stroke="#10b981"
        strokeWidth={1}
        filter="url(#weeklyShadow)"
      />
      <Bar
        dataKey="paidOrdersAmount"
        name={t('Dashboard.Chart.paidOrdersAmount')}
        fill="url(#weeklyPaidAmountGradient)"
        radius={[8, 8, 0, 0]}
        stroke="#8b5cf6"
        strokeWidth={1}
        filter="url(#weeklyShadow)"
      />
    </>
  );

  const getMonthlyChartContent = () => (
    <>
      <defs>
        <linearGradient id="ordersAreaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
        </linearGradient>
        <linearGradient id="paidOrdersAreaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
        </linearGradient>
        <linearGradient
          id="ordersCountAreaGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.05} />
        </linearGradient>
        <linearGradient
          id="paidOrdersCountAreaGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
      <XAxis
        dataKey="name"
        stroke="#64748b"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis
        stroke="#64748b"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={formatCurrency}
      />
      <Tooltip content={<CustomTooltip />} />
      <Area
        type="monotone"
        dataKey="ordersAmount"
        name={t('Dashboard.Chart.ordersAmount')}
        stroke="#3b82f6"
        strokeWidth={3}
        fill="url(#ordersAreaGradient)"
        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
        activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
      />
      <Area
        type="monotone"
        dataKey="paidOrdersAmount"
        name={t('Dashboard.Chart.paidOrdersAmount')}
        stroke="#10b981"
        strokeWidth={3}
        fill="url(#paidOrdersAreaGradient)"
        dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
        activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2, fill: '#ffffff' }}
      />
      <Area
        type="monotone"
        dataKey="ordersCount"
        name={t('Dashboard.Chart.ordersCount')}
        stroke="#f59e0b"
        strokeWidth={3}
        fill="url(#ordersCountAreaGradient)"
        dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
        activeDot={{ r: 8, stroke: '#f59e0b', strokeWidth: 2, fill: '#ffffff' }}
      />
      <Area
        type="monotone"
        dataKey="paidOrdersCount"
        name={t('Dashboard.Chart.paidOrdersCount')}
        stroke="#8b5cf6"
        strokeWidth={3}
        fill="url(#paidOrdersCountAreaGradient)"
        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
        activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2, fill: '#ffffff' }}
      />
    </>
  );

  const getYearlyChartContent = () => (
    <>
      <defs>
        <linearGradient id="yearlyOrdersGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.4} />
        </linearGradient>
        <linearGradient id="yearlyPaidGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#0f766e" stopOpacity={0.4} />
        </linearGradient>
        <linearGradient
          id="yearlyOrdersAmountGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.4} />
        </linearGradient>
        <linearGradient
          id="yearlyPaidAmountGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#d97706" stopOpacity={0.4} />
        </linearGradient>
        <filter id="yearlyShadow">
          <feDropShadow
            dx="1"
            dy="1.5"
            stdDeviation="1.5"
            floodOpacity="0.12"
          />
        </filter>
      </defs>
      <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
      <XAxis
        dataKey="name"
        stroke="#64748b"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis
        stroke="#64748b"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={formatNumber}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar
        dataKey="ordersCount"
        name={t('Dashboard.Chart.ordersCount')}
        fill="url(#yearlyOrdersGradient)"
        radius={[10, 10, 0, 0]}
        stroke="#8b5cf6"
        strokeWidth={1}
        filter="url(#yearlyShadow)"
      />
      <Bar
        dataKey="paidOrdersCount"
        name={t('Dashboard.Chart.paidOrdersCount')}
        fill="url(#yearlyPaidGradient)"
        radius={[10, 10, 0, 0]}
        stroke="#14b8a6"
        strokeWidth={1}
        filter="url(#yearlyShadow)"
      />
      <Bar
        dataKey="ordersAmount"
        name={t('Dashboard.Chart.ordersAmount')}
        fill="url(#yearlyOrdersAmountGradient)"
        radius={[10, 10, 0, 0]}
        stroke="#3b82f6"
        strokeWidth={1}
        filter="url(#yearlyShadow)"
      />
      <Bar
        dataKey="paidOrdersAmount"
        name={t('Dashboard.Chart.paidOrdersAmount')}
        fill="url(#yearlyPaidAmountGradient)"
        radius={[10, 10, 0, 0]}
        stroke="#f59e0b"
        strokeWidth={1}
        filter="url(#yearlyShadow)"
      />
    </>
  );

  const getCustomChartContent = () => (
    <>
      <CartesianGrid
        strokeDasharray="5 5"
        vertical={false}
        stroke="#e2e8f0"
        strokeWidth={1}
      />
      <XAxis
        dataKey="name"
        stroke="#475569"
        fontSize={13}
        fontWeight={600}
        tickLine={false}
        axisLine={false}
      />
      <YAxis
        stroke="#475569"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={formatNumber}
      />
      <Tooltip content={<CustomTooltip />} />
      <Area
        type="monotone"
        dataKey="ordersAmount"
        name={t('Dashboard.Chart.ordersAmount')}
        fill="#3b82f6"
        stroke="#3b82f6"
      />
      <Area
        type="monotone"
        dataKey="paidOrdersAmount"
        name={t('Dashboard.Chart.paidOrdersAmount')}
        fill="#8b5cf6"
        stroke="#8b5cf6"
      />
      <Line
        type="monotone"
        dataKey="ordersCount"
        name={t('Dashboard.Chart.ordersCount')}
        stroke="#f97316"
        strokeWidth={2}
      />
      <Line
        type="monotone"
        dataKey="paidOrdersCount"
        name={t('Dashboard.Chart.paidOrdersCount')}
        stroke="#84cc16"
        strokeWidth={2}
      />
    </>
  );

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
