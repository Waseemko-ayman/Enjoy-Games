/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import CardHeaderContent from './display/CardHeader';
import RecentOrdersItem from './display/RecentOrdersItem';
import useAPI from '@/hook/useAPI';
import { useEffect } from 'react';

export function RecentOrders() {
  const { get, data: topDonors, isLoading } = useAPI('');

  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const {
  //   data: topDonors,
  //   loading,
  //   error,
  // } = useDashboard({
  //   endpoint: API_CONFIG.endpoints.dashboard.topDonors,
  // });

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <Card>
      <CardHeaderContent
        title="Recent Orders"
        description="List of the most recent orders received"
      />
      <CardContent>
        <div className="space-y-8">
          {/* {topDonors.map((topDonors: any) => (
            <RecentOrdersItem
              key={topDonors.id}
              name={topDonors.name}
              amount={topDonors.totalDonations}
              date={topDonors.lastDonation}
            />
          ))} */}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            topDonors.map((topDonors: any) => (
              <RecentOrdersItem
                key={topDonors.id}
                name={topDonors.name}
                amount={topDonors.totalDonations}
                date={topDonors.lastDonation}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
