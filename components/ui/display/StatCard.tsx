import React from 'react';
import { TrendingUp } from 'lucide-react';

type Props = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  color: 'blue' | 'green' | 'red' | 'amber' | 'purple';
  suffix?: string;
};

const StatCard: React.FC<Props> = ({
  title,
  value,
  icon,
  trend,
  color,
  suffix = '',
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    red: 'bg-red-50 border-red-200 text-red-600',
    amber: 'bg-amber-50 border-amber-200 text-amber-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        {trend !== undefined && (
          <div
            className={`flex items-center text-sm font-medium gap-1 ${
              trend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <TrendingUp
              className={`w-4 h-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`}
            />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
          {suffix}
        </p>
        <p className="text-sm font-medium text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { ArrowDown, ArrowUp } from 'lucide-react';

// interface StatCardProps {
//   title: string;
//   amount: string;
//   // percentage: string;
//   icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   // trend: 'up' | 'down';
//   // comparison: string;
// }

// const StatCard = ({
//   title,
//   amount,
//   // percentage,
//   icon: Icon,
//   // trend,
//   // comparison,
// }: StatCardProps) => {
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">{amount}</div>
//         <p className="text-xs text-muted-foreground">
//           {/* <span
//             className={
//               trend === 'up'
//                 ? 'text-green-500 flex items-center'
//                 : 'text-red-500 flex items-center'
//             }
//           >
//             {trend === 'up' ? (
//               <ArrowUp className="mr-1 h-4 w-4" />
//             ) : (
//               <ArrowDown className="mr-1 h-4 w-4" />
//             )}
//             {percentage}
//           </span>{' '} */}
//           compared to
//           {/* {comparison} */}
//         </p>
//       </CardContent>
//     </Card>
//   );
// };

// export default StatCard;
