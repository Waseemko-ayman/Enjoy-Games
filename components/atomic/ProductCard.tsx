import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Avatar from './Avatar';
import { PiSparkleFill } from 'react-icons/pi';
import Button from './Button';
import { ProductCardProps } from '@/interfaces';
import CardWrapper from './CardWrapper';

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  imgSrc,
  imgAlt,
  imgTitle,
  price,
  newPrice,
  storeName = '',
  storeFlagImg = '',
  variant = 'row',
  cardLinkPath = '#',
  ratings,
  tall = false,
  showBtn = false,
  btnVariant = 'primary',
  btnText,
  otherClassNameBtn,
  Icon,
}) => {
  return (
    <div>
      <CardWrapper className="p-3 transform transition-transform duration-300 hover:-translate-y-2">
        <Link href={cardLinkPath}>
          <div
            className={`relative w-full h-0 ${
              tall ? 'pb-[133.33%]' : 'pb-[65%]'
            }`}
          >
            <Image
              src={imgSrc}
              alt={imgAlt}
              title={imgTitle}
              fill
              className="absolute inset-0 object-cover rounded-[6px]"
            />
          </div>
          <h3
            className={`mt-3.5 ${
              variant === 'row'
                ? 'font-bold text-lg'
                : 'font-semibold inline-block mb-1.5 text-[15px] text-[var(--enjoy-gray-650)] hover:text-[var(--enjoy-gray-300)] transition-all duration-600'
            }`}
          >
            {title}
          </h3>
          {description && (
            <div className="mb-3 text-sm mt-2">
              {price && (
                <div className="flex items-center justify-between gap-2">
                  {newPrice && (
                    <h4 className="font-semibold mb-2 text-[15px]">
                      ${newPrice}
                    </h4>
                  )}
                  <h4
                    className={`font-semibold mb-2 ${
                      newPrice
                        ? 'line-through text-gray-400 text-sm'
                        : 'text-[15px]'
                    }`}
                  >
                    ${price}
                  </h4>
                </div>
              )}

              <div
                className={`flex ${
                  variant === 'row'
                    ? 'items-center justify-between'
                    : 'flex-col'
                } gap-2`}
              >
                {storeFlagImg && (
                  <div
                    className={`flex items-center gap-1 ${
                      variant === 'row' ? 'order-1' : 'order-2'
                    }`}
                  >
                    <Avatar
                      imgSrc={`/assets/flags/${storeFlagImg}`}
                      imgAlt={storeName}
                      imgTitle={storeName}
                      width={19}
                      height={19}
                    />
                    <p
                      className={`${
                        variant === 'row' ? 'text-[15px]' : 'text-sm'
                      } font-bold`}
                    >
                      {storeName}
                    </p>
                  </div>
                )}
                {ratings && (
                  <div
                    className={`text-[var(--enjoy-secondary))] ${
                      variant === 'row' ? 'text-sm order-2' : 'text-2xl order-1'
                    }`}
                  >
                    <div className="flex items-center gap-0.5">
                      {variant === 'row' ? (
                        <>
                          <h5>{ratings}</h5>
                          <PiSparkleFill />
                        </>
                      ) : (
                        <>
                          <PiSparkleFill />
                          <h5>{ratings}</h5>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Link>
        {showBtn && (
          <Button
            variant={btnVariant}
            Icon={Icon}
            otherClassName={`${otherClassNameBtn} w-full p-2`}
          >
            {btnText}
          </Button>
        )}
      </CardWrapper>
    </div>
  );
};

export default ProductCard;
