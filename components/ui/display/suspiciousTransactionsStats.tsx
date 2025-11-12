/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '../card';
import StateCard from './StateCard';
import RiskDistributionCard from './RiskDistributionCard';
import { useTranslations } from 'next-intl';
import useAPI from '@/hook/useAPI';
import Loading from '@/components/molecules/loading';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { getStatCardData } from '@/data/StateCardData';

const SuspiciousTransactionsStats = () => {
  const t = useTranslations('Dashboard.SuspiciousTransactionsStats');

  const { get, data, isLoading, error } = useAPI(
    'suspicious-transactions/stats'
  );

  useEffect(() => {
    get();
  }, []);

  if (!data) return null;

  const riskDistribution = {
    high: data.pending_review,
    medium: data.approved,
    low: data.blocked,
    average: data.average_risk_score,
  };

  const StateCardData = getStatCardData(t, data);

  return (
    <Card className="min-h-screen overflow-hidden col-span-4">
      <CardContent className="p-0">
        {/* Header */}
        <div className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 p-3 md:p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Shield size={24} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold">
              {t('SecurityDashboard')}
            </h1>
          </div>
          <p className="text-blue-100 text-sm md:text-base">
            {t('MonitorStats')}
          </p>
        </div>

        <div className="p-3 md:p-6">
          {isLoading ? (
            <Loading />
          ) : error ? (
            <ErrorFetching error={error} />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6 mb-6">
                {StateCardData.map((item, index) => {
                  const isLastOdd =
                    StateCardData.length % 2 !== 0 &&
                    index === StateCardData.length - 1;

                  return (
                    <StateCard
                      key={index}
                      title={item.title}
                      value={item.value}
                      icon={item.icon}
                      color={item.color}
                      suffix={item.suffix}
                      otherClassName={isLastOdd ? 'col-span-2' : ''}
                    />
                  );
                })}
              </div>

              <div>
                <RiskDistributionCard
                  high={riskDistribution?.high}
                  medium={riskDistribution?.medium}
                  low={riskDistribution?.low}
                  average={riskDistribution?.average}
                />

                {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {t('KeyMetrics')}
              </h3>
              <div className="space-y-6">
                <MetricItem
                  title={t('DetectionAccuracy')}
                  subtitle={t('DetectionAccuracySubtitle')}
                  value="94.2%"
                  color="green"
                />
                <MetricItem
                  title={t('FalsePositiveRate')}
                  subtitle={t('FalsePositiveSubtitle')}
                  value="5.8%"
                  color="amber"
                />
                <MetricItem
                  title={t('ResponseTime')}
                  subtitle={t('ResponseTimeSubtitle')}
                  value="127ms"
                  color="blue"
                />
              </div>
            </div> */}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuspiciousTransactionsStats;
