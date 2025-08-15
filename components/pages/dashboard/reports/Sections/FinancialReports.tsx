'use client';

import { Card, CardContent } from '@/components/ui/card';
import CardHeaderContent from '@/components/ui/display/CardHeader';
import ChartContainer from '@/components/ui/display/ChartContainer';
import { TabsContent } from '@/components/ui/tabs';
import useAPI from '@/hook/useAPI';
import { useEffect } from 'react';

const FinancialReports = ({ isMounted }: { isMounted: boolean }) => {
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
    <TabsContent value="financial">
      <Card>
        <CardHeaderContent
          title="Financial Reports"
          description="Detailed financial data and metrics"
        />
        <CardContent>
          <ChartContainer
            isLoading={isLoading}
            isMounted={isMounted}
            data={monthlyData}
            type="bar"
            dataKeys={['donations']}
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default FinancialReports;
