'use client';

import { Card, CardContent } from '@/components/ui/card';
import CardHeaderContent from '@/components/ui/display/CardHeader';
// import NotificationItem from '@/components/ui/display/NotificationItem';
import { TabsContent } from '@/components/ui/tabs';

type AllNotificationsProps = {
  notifications: Notification[];
  isLoading: boolean;
  // getNotificationIcon: (type: string) => JSX.Element;
  onMarkAsRead: (id: string) => void;
};

const AllNotifications: React.FC<AllNotificationsProps> = ({
  // notifications,
  // isLoading,
  // getNotificationIcon,
  // onMarkAsRead,
}) => {
  return (
    <TabsContent value="all">
      <Card>
        <CardHeaderContent
          title="All Notifications"
          description="View all your recent notifications"
        />
        <CardContent>
          Loading...
          {/* <div className="space-y-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              notifications?.map(
                ({ id, title, message, type, createdAt, read }) => (
                  <NotificationItem
                    key={id}
                    id={id}
                    title={title}
                    description={message}
                    type={type}
                    time={createdAt}
                    read={read}
                    getNotificationIcon={getNotificationIcon}
                    onMarkAsRead={onMarkAsRead}
                  />
                )
              )
            )}
          </div> */}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AllNotifications;
