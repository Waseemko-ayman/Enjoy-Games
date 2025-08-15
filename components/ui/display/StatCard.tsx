import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  amount: string;
  // percentage: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  // trend: 'up' | 'down';
  // comparison: string;
}

const StatCard = ({
  title,
  amount,
  // percentage,
  icon: Icon,
  // trend,
  // comparison,
}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
        <p className="text-xs text-muted-foreground">
          {/* <span
            className={
              trend === 'up'
                ? 'text-green-500 flex items-center'
                : 'text-red-500 flex items-center'
            }
          >
            {trend === 'up' ? (
              <ArrowUp className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4" />
            )}
            {percentage}
          </span>{' '} */}
          compared to 
          {/* {comparison} */}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
