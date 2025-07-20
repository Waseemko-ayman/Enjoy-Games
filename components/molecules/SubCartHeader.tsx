import React from 'react';
import Button from '../atomic/Button';
import { ArrowRight } from 'lucide-react';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';

const SubCartHeader = ({
  title,
  href,
  handleClick,
  btnText,
}: {
  title: string;
  href?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnText?: string;
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mb-10 sm:justify-between sm:mb-8 flex-wrap ">
      <AnimatedWrapper direction="x" distance={40}>
        <h1 className="text-2xl font-bold">{title}</h1>
      </AnimatedWrapper>
      <AnimatedWrapper direction="x" distance={-40}>
        <Button
          variant="ghost"
          href={href}
          otherClassName="border border-gray-700 !text-gray-700 hover:!bg-white px-6 py-3 w-full sm:w-[350px]"
          Icon={ArrowRight}
          handleClick={handleClick}
        >
          {btnText}
        </Button>
      </AnimatedWrapper>
    </div>
  );
};

export default SubCartHeader;
