import React from 'react';
import Button from '../atomic/Button';
import { PATHS } from '@/data/paths';
import { ArrowRight } from 'lucide-react';

const SubCartHeader = () => {
  return (
    <div className="flex justify-between items-center gap-4 mb-8 flex-wrap">
      <h1 className="text-2xl font-bold">ملخص السلة</h1>
      <Button
        variant="ghost"
        href={PATHS.STORE.link}
        otherClassName="border border-gray-300 !text-gray-700 hover:!bg-white px-6 py-3 w-full sm:w-[350px]"
        Icon={ArrowRight}
      >
        العودة للتسوق
      </Button>
    </div>
  );
};

export default SubCartHeader;
