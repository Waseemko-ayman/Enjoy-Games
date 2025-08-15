import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Mail, Bell } from 'lucide-react';

type NotificationSwitchProps = {
  id?: string;
  label: string;
  description?: string;
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon?: 'mail' | 'bell';
};

const NotificationSwitch: React.FC<NotificationSwitchProps> = ({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  icon,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'mail':
        return <Mail className="h-4 w-4 text-muted-foreground" />;
      case 'bell':
        return <Bell className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {icon && getIcon()}
        <div>
          <Label htmlFor={id}>{label}</Label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

export default NotificationSwitch;
