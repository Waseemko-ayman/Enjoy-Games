'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import PageTitle from '@/components/ui/common/PageTitle';
import NotificationSettings from './Sections/NotificationSettings';
// import { useToast } from '@/lib/toast';

// const notifications = [
//   {
//     id: '1',
//     title: 'New Donation Received',
//     description: 'Michael Johnson donated $500',
//     time: '10 minutes ago',
//     type: 'donation',
//     read: false,
//   },
//   {
//     id: '2',
//     title: 'Campaign Goal Reached',
//     description:
//       "The 'Summer Fundraiser' campaign has reached its goal of $10,000",
//     time: '2 hours ago',
//     type: 'campaign',
//     read: false,
//   },
//   {
//     id: '3',
//     title: 'Payment Gateway Issue',
//     description: 'There was an issue processing payments through Stripe',
//     time: '5 hours ago',
//     type: 'system',
//     read: true,
//   },
//   {
//     id: '4',
//     title: 'New Donor Registered',
//     description: 'Sarah Williams created an account',
//     time: 'Yesterday',
//     type: 'user',
//     read: true,
//   },
//   {
//     id: '5',
//     title: 'Monthly Report Available',
//     description: 'The July 2023 monthly report is now available for download',
//     time: '2 days ago',
//     type: 'report',
//     read: true,
//   },
// ];

const NotificationsPage = () => {
  // const {
  //   get,
  //   put,
  //   data: notifications,
  //   isLoading,
  // } = useAPI<Notification>(API_CONFIG.endpoints.notifications.list);

  // const { showToast } = useToast();
  // const [isLoading, setIsLoading] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    donations: true,
    campaigns: true,
    system: true,
    reports: false,
  });

  // const [activeNotifications, setActiveNotifications] = useState(notifications);

  // const markAllAsRead = () => {
  //   setActiveNotifications(
  //     activeNotifications.map((notification) => ({
  //       ...notification,
  //       read: true,
  //     }))
  //   );
  // };

  // const markAsRead = async (id: string) => {
  //   try {
  //     await put<any>(id, {}, API_CONFIG.endpoints.notifications.read(id));
  //     await get(); // Refresh notifications
  //     showToast('Notification marked as read');
  //   } catch (err) {
  //     showToast('Failed to mark notification as read', 'error');
  //   }
  // };

  // const markAllAsRead = async () => {
  //   try {
  //     if (notifications.length > 0) {
  //       await Promise.all(
  //         notifications
  //           .filter((notification) => !notification.read)
  //           .map((notification) =>
  //             put<any>(
  //               notification.id,
  //               {},
  //               API_CONFIG.endpoints.notifications.read(notification.id)
  //             )
  //           )
  //       );
  //       await get(); // Refresh notifications
  //       showToast('All notifications marked as read');
  //     }
  //   } catch (err) {
  //     showToast('Failed to mark notifications as read', 'error');
  //   }
  // };

  // const getNotificationIcon = (type: string) => {
  //   switch (type) {
  //     case 'donation':
  //       return <DollarSign className="h-5 w-5 text-green-500" />;
  //     case 'campaign':
  //       return <Bell className="h-5 w-5 text-blue-500" />;
  //     case 'system':
  //       return <Settings className="h-5 w-5 text-red-500" />;
  //     case 'user':
  //       return <User className="h-5 w-5 text-purple-500" />;
  //     case 'report':
  //       return <CreditCard className="h-5 w-5 text-yellow-500" />;
  //     default:
  //       return <Bell className="h-5 w-5" />;
  //   }
  // };

  // const tabsData = [
  //   { value: 'all', label: 'All' },
  //   { value: 'unread', label: 'Unread' },
  //   { value: 'settings', label: 'Settings' },
  // ];

  // useEffect(() => {
  //   get();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="space-y-6">
      <PageTitle
        title="Notifications"
        description="Manage your notifications and preferences"
      />
      <Tabs defaultValue="all" className="w-full">
        {/* <TabsNavigation tabs={tabsData} variant="segmented">
          <Button
            variant="outline"
            onClick={markAllAsRead}
            // disabled={isLoading || !notifications?.length}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button> */}
        {/* </TabsNavigation> */}

        {/* <AllNotifications
          notifications={notifications}
          isLoading={isLoading}
          getNotificationIcon={getNotificationIcon}
          // onMarkAsRead={markAsRead}
        />
        <UnreadNotifications
          notifications={notifications}
          isLoading={isLoading}
          getNotificationIcon={getNotificationIcon}
          // onMarkAsRead={markAsRead}
        /> */}
        <NotificationSettings
          notificationSettings={notificationSettings}
          setNotificationSettings={setNotificationSettings}
        />
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
