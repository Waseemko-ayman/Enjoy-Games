import CardWrapper from '@/components/atomic/CardWrapper';
import { AlertCircle } from 'lucide-react';
import React from 'react';

const WarningMessage = () => {
  return (
    <CardWrapper
      bgColor="bg-orange-50"
      className="border border-orange-200 p-4 !shadow-none"
    >
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 text-orange-500 ml-2" />
        <span className="text-sm text-orange-800">
          لإعادة إرسال بريد التفعيل{' '}
          <span className="text-red-500">other.Send</span>
        </span>
      </div>
    </CardWrapper>
  );
};

export default WarningMessage;
