/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Card, CardContent } from '@/components/ui/card';
import CardHeaderContent from '@/components/ui/display/CardHeader';
import ReportItem from '@/components/ui/display/ReportItem';
import { TabsContent } from '@/components/ui/tabs';
import useAPI from '@/hook/useAPI';
import { useEffect } from 'react';

const SavedReports = () => {
  const {
    get,
    data: reports,
    isLoading,
  } = useAPI(`http://localhost:3000/reports`);

  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabsContent value="saved">
      <Card>
        <CardHeaderContent
          title="Saved Reports"
          description="Access and download previously generated reports"
        />
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              reports.map((report: any) => (
                <ReportItem key={report.id} report={report} />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SavedReports;
