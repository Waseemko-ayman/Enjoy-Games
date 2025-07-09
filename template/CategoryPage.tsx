'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/molecules/PageHeader';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import { CategoryPageProps } from '@/interfaces';

const CategoryPage: FC<CategoryPageProps> = ({ cards }) => {
  return (
    <div>
      <PageHeader />
      <Container>
        <Layer otherClassName="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <Link href={card.href || '#'} key={index} className="text-center">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={`/assets/${card.banner}`}
                  alt={card.label}
                  width={500}
                  height={500}
                />
              </div>
              <h2 className="text-xl font-bold text-[var(--enjoy-gray-650)] mt-2.5">
                {card.label}
              </h2>
            </Link>
          ))}
        </Layer>
      </Container>
    </div>
  );
};

export default CategoryPage;
