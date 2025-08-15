'use client';

import { Card, CardContent } from '@/components/ui/card';
import CardHeaderContent from '@/components/ui/display/CardHeader';
import NotificationSwitch from '@/components/ui/display/NotificationSwitch';
import { TabsContent } from '@/components/ui/tabs';
import { notificationTypes } from '@/utils/constant';

type NotificationSettingsProps = {
  notificationSettings: {
    email: boolean;
    push: boolean;
    donations: boolean;
    campaigns: boolean;
    system: boolean;
    reports: boolean;
  };
  setNotificationSettings: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      push: boolean;
      donations: boolean;
      campaigns: boolean;
      system: boolean;
      reports: boolean;
    }>
  >;
};

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  notificationSettings,
  setNotificationSettings,
}) => {
  const handleNotificationChange = (settingKey: string, checked: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [settingKey]: checked,
    }));
  };
  return (
    <TabsContent value="settings">
      <Card>
        <CardHeaderContent
          title="Notification Settings"
          description="Configure how you receive notifications"
        />
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Channels</h3>
            <NotificationSwitch
              id="email-notifications"
              label="Email Notifications"
              checked={notificationSettings.email}
              onCheckedChange={(checked) =>
                handleNotificationChange('email', checked)
              }
              icon="mail"
            />
            <NotificationSwitch
              id="push-notifications"
              label="Push Notifications"
              checked={notificationSettings.push}
              onCheckedChange={(checked) =>
                handleNotificationChange('push', checked)
              }
              icon="bell"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Types</h3>
            {notificationTypes.map(({ id, label, description, settingKey }) => (
              <NotificationSwitch
                key={id}
                id={id}
                label={label}
                description={description}
                // checked={notificationSettings[settingKey]}
                onCheckedChange={(checked) =>
                  handleNotificationChange(settingKey, checked)
                }
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default NotificationSettings;
