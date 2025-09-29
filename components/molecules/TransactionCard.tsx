import React from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Globe,
  Calendar,
} from 'lucide-react';
import { SuspiciousTransaction } from '@/interfaces';
import { useTranslations } from 'next-intl';

interface TransactionCardProps {
  transaction: SuspiciousTransaction;
  onStatusUpdate?: (
    transactionId: string,
    status: 'approved' | 'blocked'
  ) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onStatusUpdate,
}) => {
  const t = useTranslations('Dashboard.SuspiciousTransactionsStats');
  const btnT = useTranslations('BtnTexts');

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'blocked':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'blocked':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-gray-900">
                {transaction.payment_id}
              </span>
            </div>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getRiskColor(
                getRiskLevel(transaction.risk_score)
              )}`}
            >
              <Shield className="w-3 h-3" />
              {getRiskLevel(transaction.risk_score).toUpperCase()} RISK (
              {transaction.risk_score}%)
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              transaction.status
            )}`}
          >
            {getStatusIcon(transaction.status)}
            {transaction.status.toUpperCase()}
          </span>
        </div>

        {/* Amount and Time */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ${transaction.amount.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(transaction.analyzed_at)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {t('PaymentID')}: {transaction.payment_id.slice(-8)}
            </div>
            <div className="text-sm text-gray-500 flex items-center justify-end gap-1 mt-1">
              <Globe className="w-3 h-3" />
              {transaction.user_country} → {transaction.card_country}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
          <User className="w-4 h-4 text-gray-500" />
          <div>
            <div className="font-medium text-gray-900">
              {transaction.user_name}
            </div>
            <div className="text-sm text-gray-500">
              {transaction.user_email}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {t('IP')}: {transaction.user_ip}
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-xs text-gray-500">
              {t('User')}: {transaction.user_country}
            </div>
            <div className="text-xs text-gray-500">
              {t('Card')}: {transaction.card_country}
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">
            {t('RiskFactors')}:
          </div>
          <div className="flex flex-wrap gap-2">
            {transaction.risk_factors.map((factor, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-md"
              >
                {factor}
              </span>
            ))}
          </div>
        </div>

        {/* Review Information */}
        {(transaction.reviewed_at || transaction.review_notes) && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t('ReviewInformation')}
            </div>
            {transaction.reviewed_at && (
              <div className="text-sm text-blue-700">
                {t('ReviewedBy')}: {formatDate(transaction.reviewed_at)}
                {transaction.reviewed_by && ` by ${transaction.reviewed_by}`}
              </div>
            )}
            {transaction.review_notes && (
              <div className="text-sm text-blue-600 mt-1">
                {transaction.review_notes}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        {transaction.status === 'pending' && (
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => onStatusUpdate?.(transaction.id, 'approved')}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {btnT('Approve')}
            </button>
            <button
              onClick={() => onStatusUpdate?.(transaction.id, 'blocked')}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              {btnT('Block')}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Helper function to determine risk level from score
  function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
    if (score >= 80) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  }
};
