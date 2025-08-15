/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useIsMobile from '@/hook/useIsMobile';
import { useCartContext } from '@/context/CartContext';
import ProductDetailsInDialog from '@/components/molecules/ProductDetailsInDialog';
import { ProductCardProps } from '@/interfaces';
import ResponsiveDialogDrawer from '@/components/organism/ResponsiveDialogDrawer';
import Button from '@/components/atomic/Button';
import Avatar from '@/components/atomic/Avatar';
import CardWrapper from '@/components/atomic/CardWrapper';
import { useToast } from '@/lib/toast';
import { FaStar, FaStarHalfStroke } from 'react-icons/fa6';

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
  onClick,
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

  // حساب متوسط النجوم من الـ stars في كل rating object
  const averageRating =
    ratings && ratings?.length > 0
      ? ratings.reduce((sum: number, r: any) => sum + (r.stars || 0), 0) /
        ratings.length
      : null;

  const renderStars = (rating: number | null) => {
    if (rating === null) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-sm text-yellow-500" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfStroke
          key="half"
          className="text-sm text-yellow-500"
        />
      );
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
                خصم {discount.amount}%
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
                      variant === 'row'
                        ? 'text-sm order-2'
                        : 'text-base order-1'
                    } flex items-center gap-1`}
                  >
                    {renderStars(averageRating)}
                    <span className="ml-1 font-semibold">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                )}
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
