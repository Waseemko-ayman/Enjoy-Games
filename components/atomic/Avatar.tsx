import Image from 'next/image';
import React from 'react';

interface ImageProps {
  imgSrc: string;
  imgAlt: string;
  imgTitle: string;
  width: number;
  height: number;
  otherClassName?: string;
}

const Avatar = ({
  imgSrc,
  imgAlt,
  imgTitle,
  width,
  height,
  otherClassName,
}: ImageProps) => {
  return (
    <Image
      src={imgSrc}
      className={`rounded-[50%] ${otherClassName}`}
      alt={imgAlt}
      title={imgTitle}
      width={width}
      height={height}
    />
  );
};

export default Avatar;
