'use client';

export function OrdersStats() {
  // const {
  //   get,
  //   data: stats,
  //   isLoading,
  // } = useAPI(API_CONFIG.endpoints.dashboard.stats);

  // useEffect(() => {
  //   get();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const icons = {
  //   DollarSign,
  //   Users,
  //   CreditCard,
  // };

  // const {
  //   data: stats,
  //   loading,
  //   error,
  // } = useDashboard({
  //   endpoint: API_CONFIG.endpoints.dashboard.stats,
  // });

  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      dashboard-stats
      {/* {isLoading ? (
        <p>Loding...</p>
      ) : (
        // stats.map((stat: any, index: number) => {
        //   const Icon = icons[stat.icon as keyof typeof icons];
        //   return (
        //     <StatCard
        //       key={index}
        //       title={stat.title}
        //       amount={stat.amount}
        //       percentage={stat.percentage}
        //       icon={Icon}
        //       trend={stat.trend}
        //       comparison={stat.comparison}
        //     />
        //   );
        // })
        <>
          <StatCard
            title="Total Donations"
            amount={`$${stats?.totalDonations}`}
            icon={DollarSign}
          />
          <StatCard
            title="Total Donors"
            amount={`$${stats?.totalDonors}`}
            icon={Users}
          />
          <StatCard
            title="Average Donation"
            amount={`$${stats?.averageDonation?.toFixed(2)}`}
            icon={CreditCard}
          />
        </>
      )} */}
    </div>
  );
}
