/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorFetching from '@/components/molecules/ErrorFetching';
import Loading from '@/components/molecules/loading';
import useAPI from '@/hook/useAPI';
import React, { useEffect } from 'react';
import { Card, CardContent } from '../card';
import {
  Cell,
  Legend,
  Pie,
  ResponsiveContainer,
  Tooltip,
  PieChart,
} from 'recharts';
import { Users, TrendingUp, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const providerImages: Record<string, string> = {
  google: '/assets/google.png',
  facebook: '/assets/facebook.png',
  apple: '/assets/apple.png',
};

const SocialStats = () => {
  const { get, data, isLoading, error } = useAPI<any>('social/stats');

  const t = useTranslations('Dashboard.socialStats');

  useEffect(() => {
    get();
  }, [get]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorFetching />;

  const providersData = data?.providers
    ? Object.entries(data.providers).map(([key, value]) => {
        const providerInfo = data.enabled_providers.find(
          (p: any) => p.value === key
        );
        return {
          name: providerInfo?.label || key,
          value: value as number,
          color: providerInfo?.color || '#000000',
          icon: providerInfo?.icon || '',
          key,
        };
      })
    : [];

  const totalUsers = data?.total_social_users ?? 0;
  const hasData = totalUsers > 0;

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-300">
          <p className="text-sm font-medium">{data.payload.name}</p>
          <p className="text-sm">
            {data.value} {t('user')} (
            {((data.value / totalUsers) * 100).toFixed(1)}
            %)
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend with better styling
  const CustomLegend = ({ payload }: any) => (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          {providerImages[entry.payload.key] && (
            <Image
              src={providerImages[entry.payload.key]}
              alt={entry.value}
              width={17}
              height={17}
            />
          )}
          <span className="text-sm">{entry.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    // <Card className="col-span-4 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-lg">
    <Card className="col-span-4 overflow-hidden">
      <CardContent className="p-0">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <BarChart3 size={24} />
                </div>
                <h2 className="text-xl font-bold">{t('title')}</h2>
              </div>
              <p className="text-blue-100 text-sm">{t('subtitle')}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-3xl font-bold">
                <Users size={28} />
                {totalUsers.toLocaleString('ar')}
              </div>
              <p className="text-blue-100 text-sm">{t('totalUsers')}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Cards Section */}
          <div className='mb-10'>
            <div className="grid grid-cols-3 gap-4">
              {data?.enabled_providers?.map((provider: any) => {
                const providerValue = data.providers[provider.value] || 0;
                const percentage =
                  totalUsers > 0 ? (providerValue / totalUsers) * 100 : 0;

                return (
                  <div
                    key={provider.value}
                    // className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {providerImages[provider.value] && (
                        <Image
                          src={providerImages[provider.value]}
                          alt={provider.label}
                          width={30}
                          height={30}
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-sm">
                          {provider.label}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">
                      {providerValue.toLocaleString('ar')}
                    </div>
                    <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          backgroundColor: provider.color,
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart Section */}
          <div>
            {hasData ? (
              <div className="bg-white rounded-xl p-6 border border-gray-300">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={20} className="text-blue-600" />
                  <h3 className="font-semibold">{t('chartTitle')}</h3>
                </div>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={providersData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={4}
                        animationBegin={0}
                        animationDuration={1000}
                      >
                        {providersData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke={entry.color}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend content={<CustomLegend />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              // <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-100 dark:border-gray-700">
              <div className="rounded-xl p-12 text-center border border-gray-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t('noDataTitle')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {t('noDataDescription')}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialStats;
