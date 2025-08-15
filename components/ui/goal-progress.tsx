/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import CardHeaderContent from './display/CardHeader';
import { useEffect } from 'react';
import useAPI from '@/hook/useAPI';
import { useTranslations } from 'next-intl';

export function GoalProgress() {
  const t = useTranslations('Dashboard.Goal');

  const { get, data } = useAPI('order/orders-statistics');

  useEffect(() => {
    get();
  }, []);

  return (
    <Card className="col-span-3">
      <CardHeaderContent title={t('title')} description={t('desc')} />
      <CardContent>
        <div className="flex flex-col space-y-8">
          {/* <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Progress</div>
              <div className="text-sm font-medium">
                {data?.monthlyProgress}%
              </div>
            </div>
            <Progress value={data?.monthlyProgress} className="h-2" />
          </div> */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between border-b border-b-gray-300 pb-2">
              <div className="text-sm font-medium">{t('today')}</div>
              <div className="font-bold">{data?.today || 0}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold">{t('total')}</div>
              <div className="font-bold">
                {/* ${(+data?.monthlyGoal - +data?.totalDonations).toLocaleString()} */}
                {+data?.total?.toLocaleString() || 0}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
