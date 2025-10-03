interface TimeoutCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string | undefined;
  unit: string;
}

const TimeoutCard: React.FC<TimeoutCardProps> = ({
  icon,
  label,
  value,
  unit,
}) => (
  <div className="bg-slate-50 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm font-medium text-slate-600">{label}</span>
    </div>
    <p className="text-2xl font-bold text-slate-900">
      {value} <span className="text-lg font-normal text-slate-600">{unit}</span>
    </p>
  </div>
);

export default TimeoutCard;
