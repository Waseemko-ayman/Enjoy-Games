import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface OrderItemProps {
  name: string;
  // email: string;
  amount: number;
  date: string;
}

const RecentOrdersItem = ({
  name,
  // email,
  amount,
  date,
}: OrderItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <Avatar className="h-9 w-9">
        <AvatarFallback>
          {name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <p className="text-sm font-medium leading-none">{name}</p>
      {/* <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div> */}
      <div className="ml-auto flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
        <Badge variant="outline" className="whitespace-nowrap">
          completed
        </Badge>
        <span className="font-medium whitespace-nowrap">
          ${amount.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};

export default RecentOrdersItem;
