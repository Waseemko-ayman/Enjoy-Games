import Image from 'next/image';
import React from 'react';
import Button from '../atomic/Button';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { RewardCardProps } from '@/interfaces';
import { useToggleLocale } from '@/hook/useToggleLocale';

const RewardCard = ({
  title,
  description,
  image,
  buttonText,
  onClick,
  href,
}: RewardCardProps) => {
  const { isArabic } = useToggleLocale();
  return (
    <div className="flex items-end gap-4 max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:text-center">
      <div className="mt-3 sm:mt-10 max-sm:order-2">
        <h3 className="text-2xl sm:text-3xl font-bold text-enjoy-primary mb-3.5">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[var(--enjoy-gray-675)] font-medium mb-4">
          {description}
        </p>
        <Button
          variant="third"
          href={href}
          handleClick={onClick}
          Icon={isArabic ? FaArrowLeftLong : FaArrowRightLong}
          otherClassName="py-2 px-5 gap-5 max-sm:mx-auto max-w-[250px]"
          iconPosition="right"
        >
          {buttonText}
        </Button>
      </div>
      <Image
        src={image}
        alt={title}
        width={112}
        height={112}
        className="max-sm:w-20 max-sm:h-20 max-sm:order-1"
      />
    </div>
  );
};

export default RewardCard;
