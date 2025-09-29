import React from 'react';

const RiskBar: React.FC<{
  label: string;
  count: number;
  percent: number;
  color: string;
}> = ({ label, count, percent, color }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1">
        <div className={`w-3 h-3 rounded-full mr-2 bg-${color}-500`}></div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold text-gray-900">{count}</span>
        <span className="text-sm text-gray-500">
          ({!isNaN(percent) ? percent.toFixed(1) : 0}%)
        </span>
      </div>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full bg-${color}-500`}
        style={{ width: `${!isNaN(percent) ? percent : 0}%` }}
      ></div>
    </div>
  </div>
);

export default RiskBar;
