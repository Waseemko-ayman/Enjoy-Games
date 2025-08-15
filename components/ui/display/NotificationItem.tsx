import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type NotificationItemProps = {
  id: string;
  title: string;
  description: string;
  type: string;
  time: string;
  read: boolean;
  // getNotificationIcon: (type: string) => JSX.Element;
  onMarkAsRead: (id: string) => void;
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  title,
  description,
  type,
  time,
  read,
  // getNotificationIcon,
  onMarkAsRead,
}) => {
  const formattedTime = format(new Date(time), 'MMM dd, h:mm a');

  return (
    <div
      key={id}
      className={`flex items-start space-x-4 rounded-lg border p-4 ${
        read ? 'bg-white' : 'bg-muted'
      }`}
    >
      {/* <div className="mt-1">{getNotificationIcon(type)}</div> */}
      <div className="mt-1">{type}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-none">{title}</p>
          <p className="text-xs text-muted-foreground">{formattedTime}</p>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {!read && (
        <Badge
          variant="default"
          className="ml-2"
          onClick={() => onMarkAsRead(id)}
        >
          New
        </Badge>
      )}
    </div>
  );
};

export default NotificationItem;
