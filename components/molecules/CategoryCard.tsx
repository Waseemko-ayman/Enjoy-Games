import { CategoryCardProps } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CategoryCard: React.FC<CategoryCardProps> = ({
  href = '#',
  banner = '#',
  label,
}) => {
  return (
    <Link
      href={href}
      className="text-center hover:opacity-80 transition-all duration-300"
    >
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <Image src={`/assets/${banner}`} alt={label} width={500} height={500} />
      </div>
      <h2 className="text-xl font-bold text-[var(--enjoy-gray-650)] mt-2.5">
        {label}
      </h2>
    </Link>
  );
};

export default CategoryCard;
