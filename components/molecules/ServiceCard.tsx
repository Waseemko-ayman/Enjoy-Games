import Image from 'next/image';
import React from 'react';

interface ServiceCardProps {
  image: string;
  imgAlt: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  imgAlt,
  title,
  description,
}) => {
  return (
    <div className="flex gap-7 bg-[var(--enjoy-glass-lavender)] rounded-[20px] py-5 px-3">
      <div className="flex items-center justify-between bg-enjoy-primary rounded-sm p-2 h-fit">
        <Image
          src={`/assets/${image}.GIF`}
          alt={imgAlt}
          width={50}
          height={50}
        />
      </div>
      <div>
        <h4 className="text-lg mb-1 font-semibold">{title}</h4>
        <p className="text-base font-medium text-[var(--enjoy-gray-650)]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
