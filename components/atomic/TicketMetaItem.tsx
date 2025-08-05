import { TicketMetaItemProps } from '@/interfaces';
import React from 'react';

const TicketMetaItem: React.FC<TicketMetaItemProps> = ({
  Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {Icon && <Icon className="w-4 h-4 text-gray-500" />}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

export default TicketMetaItem;
