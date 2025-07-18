import React from 'react';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import CardWrapper from '@/components/atomic/CardWrapper';
import Image from 'next/image';
import Button from '@/components/atomic/Button';
import { EmptyStateBoxProps } from '@/interfaces';

const EmptyStateBox = ({
  imageSrc,
  alt,
  title,
  buttonText,
  btnlink,
}: EmptyStateBoxProps) => {
  return (
    <Layer otherClassName="!my-12">
      <Container>
        <CardWrapper className="py-[60px]">
          <div className="mx-auto max-w-[300px]">
            <Image
              src={imageSrc}
              alt={alt}
              width={150}
              height={150}
              className="mx-auto"
            />
            <div className="text-center mt-5">
              <h5 className="text-lg text-[var(--enjoy-gray-650)] font-normal mb-5">
                {title}
              </h5>
              <Button href={btnlink} otherClassName="py-3 w-full mx-auto">
                {buttonText}
              </Button>
            </div>
          </div>
        </CardWrapper>
      </Container>
    </Layer>
  );
};

export default EmptyStateBox;
