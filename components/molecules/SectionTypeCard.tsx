import React from 'react';
import Avatar from '../atomic/Avatar';
import Link from 'next/link';

interface SectionTypeCardProps {
  path: string;
  title: string;
  imgSrc: string;
  imgAlt: string;
  imgTitle: string;
  width: number;
  height: number;
}

const SectionTypeCard: React.FC<SectionTypeCardProps> = ({
  path,
  title,
  imgSrc,
  imgAlt,
  imgTitle,
  width,
  height,
}) => {
  return (
    <Link href={path}>
      <Avatar
        imgSrc={imgSrc}
        imgAlt={imgAlt}
        imgTitle={imgTitle}
        width={width}
        height={height}
        otherClassName="mx-auto"
      />
      <h4 className="text-lg text-center mt-4 font-bold">{title}</h4>
    </Link>
  );
};

export default SectionTypeCard;
