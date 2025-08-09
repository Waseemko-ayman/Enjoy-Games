import Image from 'next/image';
// import Link from 'next/link';
import React, { useState } from 'react';
import Avatar from './Avatar';
import { PiSparkleFill } from 'react-icons/pi';
import Button from './Button';
import { ProductCardProps } from '@/interfaces';
import CardWrapper from './CardWrapper';
import ResponsiveDialogDrawer from '../organism/ResponsiveDialogDrawer';
import useIsMobile from '@/hook/useIsMobile';
import { useCartContext } from '@/context/CartContext';
import { useToast } from '@/lib/toast';
import { useTranslations } from 'next-intl';
import ProductDetailsInDialog from '../molecules/ProductDetailsInDialog';

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  imgAlt = '',
  imgTitle,
  price_before,
  price,
  storeName = '',
  storeFlagImg = '',
  variant = 'row',
  // cardLinkPath = '#',
  onClick,
  // onAddToCart,
  discount,
  ratings,
  tall = false,
  showDesc = false,
  showBtn = false,
  btnVariant = 'primary',
  btnText,
  otherClassNameBtn,
  icon,
  productData,
}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { addToCart } = useCartContext();
  const { showToast } = useToast();
  const msgTxts = useTranslations('Messages');

  const safeImage =
    image &&
    typeof image === 'string' &&
    image.trim() !== '' &&
    !image.includes(' ')
      ? image.startsWith('http') || image.startsWith('/')
        ? image
        : `/${image}`
      : '/assets/play-station.webp';

  // Calculate average rating if ratings is an array of numbers
  const averageRating = ratings?.length
    ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
    : null;

  // Or if ratings is array of objects like [{score: number}], use:
  // const averageRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length : null;

  // Function to render stars based on average rating (rounded)
  const renderStars = (rating: number | null) => {
    if (rating === null) return null;
    const stars = [];
    const rounded = Math.round(rating);
    for (let i = 0; i < rounded; i++) {
      stars.push(<PiSparkleFill key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div>
      <CardWrapper className="p-3 transform transition-transform duration-300 hover:-translate-y-2">
        <div onClick={onClick} className="cursor-pointer">
          <div
            className={`relative w-full h-0 ${
              tall ? 'pb-[133.33%]' : 'pb-[65%]'
            }`}
          >
            {safeImage && (
              <Image
                src={safeImage}
                alt={imgAlt}
                title={imgTitle}
                fill
                className="absolute inset-0 object-cover rounded-[6px]"
              />
            )}
            {discount && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-1 rounded-lg shadow-md z-10">
                خصم
                {discount.amount}%
              </span>
            )}
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
          {showDesc && (
            <div className="mb-3 text-sm mt-2">
              {price_before && (
                <div className="flex items-center justify-between gap-2">
                  {price && (
                    <h4 className="font-semibold mb-2 text-[15px]">
                      {price.amount} {price.currency}
                    </h4>
                  )}
                  <h4
                    className={`font-semibold mb-2 ${
                      price
                        ? 'line-through text-gray-400 text-sm'
                        : 'text-[15px]'
                    }`}
                  >
                    {price_before.amount} {price_before.currency}
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
                {averageRating !== null && (
                  <div
                    className={`text-[var(--enjoy-secondary)] ${
                      variant === 'row' ? 'text-sm order-2' : 'text-2xl order-1'
                    } flex items-center gap-1`}
                  >
                    {renderStars(averageRating)}
                    <span className="ml-1 font-semibold">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                )}
                {/* {ratings && (
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
                )} */}
              </div>
            </div>
          )}
        </div>
        {showBtn && (
          <ResponsiveDialogDrawer
            trigger={
              <Button
                variant={btnVariant}
                Icon={icon}
                otherClassName={`${otherClassNameBtn} w-full p-2 max-sm:!text-sm`}
                handleClick={() => setOpen(true)}
              >
                {btnText}
              </Button>
            }
            open={open}
            setOpen={setOpen}
            isMobile={isMobile}
          >
            {open && productData && (
              <ProductDetailsInDialog
                product={productData}
                onAddToCart={(data) => {
                  addToCart(data);
                  showToast(`${data.title} ${msgTxts('addedToCart')}`);
                  setOpen(false);
                }}
              />
            )}
          </ResponsiveDialogDrawer>
        )}
      </CardWrapper>
    </div>
  );
};

export default ProductCard;
