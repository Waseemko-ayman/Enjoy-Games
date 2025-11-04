import ButtonLoading from "../atomic/ButtonLoading";

interface TimeoutCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string | undefined;
  unit: string;
  getIsLoading: boolean;
}

const TimeoutCard: React.FC<TimeoutCardProps> = ({
  icon,
  label,
  value,
  unit,
  getIsLoading,
}) => (
  <div className="bg-slate-50 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm font-medium text-slate-600">{label}</span>
    </div>
    <p className="text-2xl font-bold text-slate-900">
      {getIsLoading ? <ButtonLoading borderColor="border-black" /> : value}{' '}
      <span className="text-lg font-normal text-slate-600">{unit}</span>
    </p>
  </div>
);

export default TimeoutCard;
