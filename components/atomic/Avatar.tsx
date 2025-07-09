import { ImageProps } from '@/interfaces';
import Image from 'next/image';
import React from 'react';

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
