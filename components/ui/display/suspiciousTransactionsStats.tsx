/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
} from 'lucide-react';
import { Card, CardContent } from '../card';
import StatCard from './StatCard';
import RiskDistributionCard from './RiskDistributionCard';
import { useTranslations } from 'next-intl';
import useAPI from '@/hook/useAPI';
import Loading from '@/components/molecules/loading';
import ErrorFetching from '@/components/molecules/ErrorFetching';

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

  return (
    <Card className="min-h-screen overflow-hidden col-span-4">
      <CardContent className="p-0">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 p-4 md:p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Shield size={24} />
            </div>
            <h1 className="text-base md:text-lg lg:text-xl font-bold">
              {t('SecurityDashboard')}
            </h1>
          </div>
          <p className="text-blue-100 text-xs md:text-sm">
            {t('MonitorStats')}
          </p>
        </div>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorFetching />
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2 p-6">
              <StatCard
                title={t('TotalCases')}
                value={data.total_suspicious_transactions}
                icon={<AlertTriangle className="w-6 h-6" />}
                trend={0}
                color="blue"
              />
              <StatCard
                title={t('AcceptedTransactions')}
                value={data.approved}
                icon={<CheckCircle className="w-6 h-6" />}
                trend={0}
                color="green"
              />
              <StatCard
                title={t('BlockedTransactions')}
                value={data.blocked}
                icon={<XCircle className="w-6 h-6" />}
                trend={0}
                color="red"
              />
              <StatCard
                title={t('BlockRate')}
                value={(data?.block_rate || 0).toFixed(1)}
                icon={<Shield className="w-6 h-6" />}
                color="amber"
                suffix="%"
              />
              <StatCard
                title={t('CountryMismatches')}
                value={data.country_mismatches}
                icon={<Globe className="w-6 h-6" />}
                trend={0}
                color="purple"
              />
            </div>

            <div className="p-6">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuspiciousTransactionsStats;
