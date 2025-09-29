import React from 'react';

interface MetricItemProps {
  title: string;
  subtitle: string;
  value: string;
  color: string;
  withBorder?: boolean;
}

const MetricItem: React.FC<MetricItemProps> = ({
  title,
  subtitle,
  value,
  color,
  withBorder,
}) => {
  return (
    <div className={`${withBorder ? 'pb-4 border-b border-gray-200' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
      </div>
    </div>
  );
};

export default MetricItem;
