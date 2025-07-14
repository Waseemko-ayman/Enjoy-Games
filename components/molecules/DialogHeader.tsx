import Button from '@/components/atomic/Button';
import { FaX } from 'react-icons/fa6';

const DialogHeader = ({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) => (
  <div className="flex items-center justify-between gap-2 mb-2">
    <h5 className="text-lg font-semibold">{title}</h5>
    <Button
      variant="forth"
      handleClick={onClose}
      otherClassName="shadow-sm w-6 h-6"
    >
      <FaX className="w-3 h-3 text-gray-600" />
    </Button>
  </div>
);

export default DialogHeader;
