import Button from '@/components/atomic/Button';
import CardWrapper from '@/components/atomic/CardWrapper';
import { PATHS } from '@/data/paths';
import React from 'react';

const Questions = () => {
  return (
    <CardWrapper
      bgColor="bg-white"
      className="text-center p-6 hover:-translate-x-1 transition duration-500"
    >
      <h3 className="text-base font-normal mb-5">
        هل بحثت عن سؤالك في الأسئلة الشائعة
      </h3>
      <Button
        href={PATHS.FAQ.link}
        variant="forth"
        otherClassName="w-full py-3 px-3"
      >
        الأسئلة الشائعة
      </Button>
    </CardWrapper>
  );
};

export default Questions;
