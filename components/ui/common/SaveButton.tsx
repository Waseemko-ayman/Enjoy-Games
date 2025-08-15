/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Save, Check } from 'lucide-react';

type SaveButtonProps = {
  onClick?: () => void;
  saving: boolean;
  success: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: any;
};

const SaveButton: React.FC<SaveButtonProps> = ({
  onClick,
  saving,
  success,
  type = 'button',
  disabled,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || saving || success}
      className="mt-6"
    >
      {saving ? (
        <>
          <Save className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : success ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Saved Successfully
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </>
      )}
    </Button>
  );
};

export default SaveButton;
