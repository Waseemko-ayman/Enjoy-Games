/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { OrdersHeader } from '@/components/ui/display/orders-header';
import { GoalProgress } from '@/components/ui/goal-progress';
import { OrderChart } from '@/components/ui/orders-chart';
import { useState } from 'react';
import { format } from 'date-fns';
import useAPI from '@/hook/useAPI';

const DashboardPage = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [, setFilterApplied] = useState(false);
  const [errors, setErrors] = useState<{ start?: boolean; end?: boolean }>({});
  const [dateData, setDateData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('monthly');

  const { add, isLoading: addLoading } = useAPI<any>(
    `order/orders-count-statistics-manual`
  );

  const handleFilter = async () => {
    const newErrors = {
      start: !startDate,
      end: !endDate,
    };
    setErrors(newErrors);

    if (startDate && endDate) {
      const res = await add({
        start_date: format(startDate, 'dd-MM-yyyy'),
        end_date: format(endDate, 'dd-MM-yyyy'),
      });
      setDateData(res?.data);
      setFilterApplied(true);
      setActiveTab('custom');
    }
  };

  return (
    <div className="space-y-6">
      <OrdersHeader
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onFilter={handleFilter}
        addLoading={addLoading}
        setErrors={setErrors}
        errors={errors}
      />
      {/* <OrdersStats /> */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-1 lg:col-span-5">
          <OrderChart
            startDate={startDate}
            endDate={endDate}
            activeTab={activeTab}
            dateData={dateData}
            setActiveTab={setActiveTab}
            addLoading={addLoading}
          />
        </div>
        <div className="md:col-span-1 lg:col-span-2">
          <GoalProgress />
        </div>
      </div>
      {/* <RecentOrders /> */}
    </div>
  );
};

export default DashboardPage;
