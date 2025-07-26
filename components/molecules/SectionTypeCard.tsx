import React from 'react';
import Avatar from '../atomic/Avatar';
import Link from 'next/link';
import { SectionTypeCardProps } from '@/interfaces';

const SectionTypeCard: React.FC<SectionTypeCardProps> = ({
  path,
  name,
  imgSrc,
  imgAlt,
  imgTitle,
  width,
  height,
  otherClassName,
}) => {
  return (
    <Link href={path}>
      <Avatar
        imgSrc={imgSrc}
        imgAlt={imgAlt}
        imgTitle={imgTitle}
        width={width}
        height={height}
        otherClassName={`mx-auto ${otherClassName}`}
      />
      <h4 className="text-sm sm:text-lg text-center mt-4 font-bold">{name}</h4>
    </Link>
  );
};

export default SectionTypeCard;
