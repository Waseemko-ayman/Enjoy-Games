import { ServiceCardProps } from '@/interfaces';
import Image from 'next/image';
import React from 'react';
import CardWrapper from '../atomic/CardWrapper';

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  imgAlt,
  title,
  description,
}) => {
  return (
    <CardWrapper
      className="py-5 px-3 flex gap-7 !shadow-none"
      bgColor="bg-[var(--enjoy-glass-lavender)]"
    >
      <div className="flex items-center justify-between bg-enjoy-primary rounded-sm p-2 h-fit">
        <Image src={image} alt={imgAlt} width={50} height={50} />
      </div>
      <div>
        <h4 className="text-base mb-1 font-semibold">{title}</h4>
        <p className={`text-sm font-medium text-[var(--enjoy-gray-650)]`}>
          {description}
        </p>
      </div>
    </CardWrapper>
  );
};

export default ServiceCard;
