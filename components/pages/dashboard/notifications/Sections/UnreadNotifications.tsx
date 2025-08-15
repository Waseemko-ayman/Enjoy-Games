'use client';

import { Card, CardContent } from '@/components/ui/card';
import CardHeaderContent from '@/components/ui/display/CardHeader';
import { TabsContent } from '@/components/ui/tabs';

type UnreadNotificationsProps = {
  notifications: Notification[];
  isLoading: boolean;
  // getNotificationIcon: (type: string) => JSX.Element;
  onMarkAsRead: (id: string) => void;
};

const UnreadNotifications: React.FC<UnreadNotificationsProps> = (
  {
    // notifications,
    // isLoading,
    // getNotificationIcon,
    // onMarkAsRead,
  }
) => {
  return (
    <TabsContent value="unread">
      <Card>
        <CardHeaderContent
          title="Unread Notifications"
          description="View your unread notifications"
        />
        <CardContent>
          Loading...
          {/* <div className="space-y-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              notifications
                ?.filter((notification) => !notification.read)
                .map(({ id, title, message, type, createdAt, read }) => (
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
                ))
            )}

            {notifications.filter((notification) => !notification.read)
              .length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Check className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">All caught up!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You have no unread notifications.
                </p>
              </div>
            )}
          </div> */}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default UnreadNotifications;
