import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Avatar from './Avatar';
import { PiStarFourFill } from 'react-icons/pi';
import Button from './Button';

interface CommonCardProps {
  title: string;
  titleIsLink?: boolean;
  productLink?: string;
  description?: boolean;
  imgSrc: string;
  imgAlt: string;
  imgTitle: string;
  price?: number;
  storeName?: string;
  storeFlagImg?: string;
  variant?: 'row' | 'column';
  cardLinkPath?: string;
  ratings?: string;
  tall?: boolean;
  btnVariant?: 'primary' | 'secondary';
  btnText?: string;
  otherClassNameBtn?: string;
  Icon?: React.ElementType;
}

const CommonCard: React.FC<CommonCardProps> = ({
  title,
  titleIsLink = false,
  productLink = '#',
  description,
  imgSrc,
  imgAlt,
  imgTitle,
  price,
  storeName = '',
  storeFlagImg = '',
  variant = 'row',
  cardLinkPath = '#',
  ratings,
  tall = false,
  btnVariant = 'primary',
  btnText,
  otherClassNameBtn,
  Icon,
}) => {
  return (
    <Link
      href={cardLinkPath}
      className="bg-white p-3 rounded-xl shadow-custom transform transition-transform duration-300 hover:-translate-y-2"
    >
      <div
        className={`relative w-full h-0 ${tall ? 'pb-[133.33%]' : 'pb-[65%]'}`}
      >
        <Image
          src={imgSrc}
          alt={imgAlt}
          title={imgTitle}
          fill
          className="absolute inset-0 object-cover rounded-[6px]"
        />
      </div>

      {titleIsLink ? (
        <Link
          href={productLink}
          className="font-bold mt-3.5 inline-block mb-1.5 text-base text-[var(--daleel-gray-650)] hover:text-[var(--daleel-gray-300)] transition-all duration-600"
        >
          {title}
        </Link>
      ) : (
        <h3 className="font-bold mt-3.5 text-xl">{title}</h3>
      )}

      {description && (
        <div className="mb-3 text-sm">
          {price && <h4 className="font-semibold mb-2 text-base">${price}</h4>}

          <div
            className={`flex ${
              variant === 'row' ? 'items-center justify-between' : 'flex-col'
            } gap-2`}
          >
            <div
              className={`flex items-center gap-1 ${
                variant === 'row' ? 'order-1' : 'order-2'
              }`}
            >
              <Avatar
                imgSrc={storeFlagImg}
                imgAlt={storeName}
                imgTitle={storeName}
                width={19}
                height={19}
              />
              <p
                className={`${
                  variant === 'row' ? 'text-sm' : 'text-base'
                } font-bold`}
              >
                {storeName}
              </p>
            </div>
            <div
              className={`text-[var(--daleel-secondary))] ${
                variant === 'row' ? 'text-sm order-2' : 'text-2xl order-1'
              }`}
            >
              <div className="flex items-center gap-0.5">
                {variant === 'row' ? (
                  <>
                    <h5>{ratings}</h5>
                    <PiStarFourFill />
                  </>
                ) : (
                  <>
                    <PiStarFourFill />
                    <h5>{ratings}</h5>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {btnVariant && (
        <Button
          variant={btnVariant}
          Icon={Icon}
          otherClassName={otherClassNameBtn}
        >
          {btnText}
        </Button>
      )}
    </Link>
  );
};

export default CommonCard;
