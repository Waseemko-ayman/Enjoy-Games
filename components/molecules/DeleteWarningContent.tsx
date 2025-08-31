/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/atomic/Button';

type DeleteWarningContentProps = {
  msgTxts: any;
  btnTexts: any;
  onCancel: () => void;
  onDelete: () => void;
};

export const DeleteWarningContent: React.FC<DeleteWarningContentProps> = ({
  msgTxts,
  btnTexts,
  onCancel,
  onDelete,
}) => {
  return (
    <div>
      <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
        <AlertTriangle className="h-6 w-6 text-red-600" />
        <div>
          <h3 className="text-lg font-semibold text-red-700">
            {msgTxts('deleteWarningTitle')}
          </h3>
          <p className="text-gray-700">
            {msgTxts.rich('deleteWarningMessage', {
              item: (chunks: any) => (
                <span className="font-bold text-red-600">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          otherClassName="px-5 py-2"
          variant="third"
          handleClick={onCancel}
        >
          {btnTexts('cancel')}
        </Button>
        <Button
          otherClassName="px-5 py-2 !bg-red-500 hover:!bg-red-600"
          handleClick={onDelete}
        >
          {btnTexts('delete')}
        </Button>
      </div>
    </div>
  );
};
