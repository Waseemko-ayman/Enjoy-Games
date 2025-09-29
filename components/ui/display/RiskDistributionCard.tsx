import React from 'react';
import { Activity } from 'lucide-react';
import RiskItem from './RiskItem';
import { useTranslations } from 'next-intl';

const RiskDistributionCard: React.FC<{
  high: number;
  medium: number;
  low: number;
  average: number;
}> = ({ high, medium, low, average }) => {
  const t = useTranslations('Dashboard.SuspiciousTransactionsStats');

  const total = high + medium + low;
  const highPercent = total ? (high / total) * 100 : 0;
  const mediumPercent = total ? (medium / total) * 100 : 0;
  const lowPercent = total ? (low / total) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-3 rounded-lg bg-purple-50 border-purple-200 text-purple-600">
          <Activity className="w-6 h-6" />
        </div>
        <h3 className="ml-3 text-lg font-semibold text-gray-900">
          {t('riskScoreDistribution')}
        </h3>
      </div>

      <div className="space-y-4">
        <RiskItem
          label={t('highRisk')}
          count={high}
          percent={highPercent}
          color="red"
        />
        <RiskItem
          label={t('mediumRisk')}
          count={medium}
          percent={mediumPercent}
          color="amber"
        />
        <RiskItem
          label={t('lowRisk')}
          count={low}
          percent={lowPercent}
          color="green"
        />
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {t('averageRiskScore')}
          </span>
          <span className="text-lg font-bold text-gray-900">{average}/10</span>
        </div>
      </div>
    </div>
  );
};

export default RiskDistributionCard;
