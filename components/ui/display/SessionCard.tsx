// import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type SessionType = 'current' | 'previous' | 'suspicious' | 'expired';

interface SessionCardProps {
  browser: string;
  os: string;
  ip: string;
  duration: string;
  type?: SessionType;
  isActive?: boolean;
  className?: string;
}

const sessionTitles = {
  current: 'Current Session',
  previous: 'Previous Session',
  suspicious: 'Suspicious Session',
  expired: 'Expired Session',
};

// const badgeVariants = {
//   current: 'outline',
//   previous: 'secondary',
//   suspicious: 'destructive',
//   expired: 'default',
// };

// const badgeLabels = {
//   current: 'Active',
//   previous: 'Inactive',
//   suspicious: 'Warning',
//   expired: 'Expired',
// };

export function SessionCard({
  browser,
  os,
  ip,
  duration,
  type = 'current',
  // isActive = true,
  className,
}: SessionCardProps) {
  // Only show badge if session is current and active, or for other types
  // const showBadge = (type === 'current' && isActive) || type !== 'current';

  return (
    <div className={cn('rounded-md border', className)}>
      <div className="flex items-center justify-between p-4">
        <div className="space-y-0.5">
          <div className="text-sm font-medium">{sessionTitles[type]}</div>
          <div className="text-xs text-muted-foreground">
            {browser} on {os} • IP {ip}
          </div>
          <div className="text-xs text-muted-foreground">
            Started {duration} ago
          </div>
        </div>
        {/* {showBadge && (
          <Badge variant={badgeVariants[type]} className="ml-2">
            {type === 'current' ? badgeLabels.current : badgeLabels[type]}
          </Badge>
        )} */}
      </div>
    </div>
  );
}
