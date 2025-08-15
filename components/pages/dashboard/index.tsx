// import { OrdersStats } from '@/components/ui/orders-stats';
import { OrdersHeader } from '@/components/ui/display/orders-header';
import { GoalProgress } from '@/components/ui/goal-progress';
import { OrderChart } from '@/components/ui/orders-chart';
// import { RecentOrders } from '@/components/ui/recent-orders';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <OrdersHeader />
      {/* <OrdersStats /> */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-1 lg:col-span-5">
          <OrderChart />
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
