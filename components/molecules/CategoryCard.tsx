import { CategoryCardProps } from '@/interfaces';
import Image from 'next/image';
import React, { Suspense } from 'react';
import Loading from './loading';

const CategoryCard: React.FC<CategoryCardProps> = ({
  onClick,
  image = '#',
  name,
}) => {
  return (
    <div
      onClick={onClick}
      className="text-center hover:opacity-80 transition-all duration-300 cursor-pointer"
    >
      <Suspense fallback={<Loading />}>
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <Image src={image} alt={name} width={500} height={500} />
        </div>
      </Suspense>
      <h2 className="text-xl font-bold text-[var(--enjoy-gray-650)] mt-2.5">
        {name}
      </h2>
    </div>
  );
};

export default CategoryCard;
