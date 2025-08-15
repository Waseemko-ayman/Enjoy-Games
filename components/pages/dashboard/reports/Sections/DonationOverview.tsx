'use client';

import { Card, CardContent } from '@/components/ui/card';
import CardHeaderContent from '@/components/ui/display/CardHeader';
import { TabsContent } from '@/components/ui/tabs';
import useAPI from '@/hook/useAPI';
import { useEffect } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const DonationOverview = ({ isMounted }: { isMounted: boolean }) => {
  const {
    get,
    data: monthlyData,
    isLoading,
  } = useAPI(`http://localhost:3000/monthlyData`);

  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabsContent value="overview">
      <Card>
        <CardHeaderContent
          title="Donation Overview"
          description="Summary of donations and donors over time"
        />
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            isMounted && (
              <div className="h-[250px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
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
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="donations"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Donations ($)"
                    />
                    <Line
                      type="monotone"
                      dataKey="donors"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Donors"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )
          )}
          {/* <ChartContainer
            isLoading={isLoading}
            isMounted={isMounted}
            data={monthlyData}
            type="line"
            dataKeys={['donations', 'donors']}
          /> */}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default DonationOverview;
