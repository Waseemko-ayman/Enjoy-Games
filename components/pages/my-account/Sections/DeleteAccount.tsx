import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { AlertCircle } from 'lucide-react';
import React from 'react';

const DeleteAccount = () => {
  return (
    <AnimatedWrapper>
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-red-500" />
        <p className="text-gray-400 text-sm cursor-pointer">
          هل تريد{' '}
          <span className="text-red-500 text-[15px] font-semibold">
            حذف الحساب
          </span>
        </p>
      </div>
    </AnimatedWrapper>
  );
};

export default DeleteAccount;
