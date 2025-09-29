/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { FilterTabs } from '@/components/molecules/FilterTabs';
import Loading from '@/components/molecules/loading';
import { TransactionCard } from '@/components/molecules/TransactionCard';
import { Card, CardContent } from '@/components/ui/card';
import useAPI from '@/hook/useAPI';
import { FraudStats } from '@/interfaces';
import { useToast } from '@/lib/toast';
import { Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

const SuspiciousTransactions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [transactionsData, setTransactionsData] = useState<any[]>([]);
  const [stats, setStats] = useState<FraudStats>({
    total_count: 0,
    pending_review: 0,
    approved: 0,
    blocked: 0,
  });

  const t = useTranslations('Dashboard.SuspiciousTransactionsStats');
  const { showToast } = useToast();

  // API Hook
  const { get, data, isLoading, error } = useAPI('suspicious-transactions');
  const { add: reviewTransaction } = useAPI('suspicious-transactions/review');

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    if (data) {
      setStats({
        total_count: data?.total_count,
        pending_review: data?.pending_review,
        approved: data?.approved,
        blocked: data?.blocked,
      });
      setTransactionsData(data?.suspicious_transactions || []);
    }
  }, [data]);

  const handleStatusUpdate = async (
    transactionId: string,
    status: 'approved' | 'blocked'
  ) => {
    try {
      const res = await reviewTransaction({
        transaction_id: transactionId,
        decision: status,
      });

      setTransactionsData((prev) =>
        prev.map((t) => (t.id === transactionId ? { ...t, status } : t))
      );

      setStats((prev) => ({
        ...prev,
        pending_review: prev.pending_review - 1,
        approved: status === 'approved' ? prev.approved + 1 : prev.approved,
        blocked: status === 'blocked' ? prev.blocked + 1 : prev.blocked,
      }));
      showToast(res?.message);
    } catch (err: any) {
      showToast(err?.res?.message, 'error');
    }
  };

  const filteredTransactions = transactionsData.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.status === activeFilter;
  });

  return (
    <Card className="overflow-hidden col-span-4 mt-5">
      <CardContent className="p-0">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Shield size={24} />
            </div>
            <h1 className="text-xl font-bold">
              {t('FraudDetectionDashboard')}
            </h1>
          </div>
          <p className="text-blue-100 text-sm">{t('MonitorStats')}</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            stats={stats}
          />
        </div>

        {/* Transactions List */}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorFetching />
        ) : (
          <div className="space-y-4 p-2">
            {transactionsData?.length === 0 ? (
              <div className="bg-white p-12 text-center">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('NoTransactions')}
                </h3>
                <p className="text-gray-500">
                  {activeFilter === 'all'
                    ? t('NoSuspiciousDetected')
                    : t('NoFilteredTransactions', { filter: activeFilter })}
                </p>
              </div>
            ) : (
              filteredTransactions?.map((transaction: any) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuspiciousTransactions;
