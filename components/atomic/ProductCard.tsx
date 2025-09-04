/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
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
import { FaRegStar, FaStar, FaStarHalfStroke } from 'react-icons/fa6';
import { extractText } from '@/utils/extractText';
import dynamic from 'next/dynamic';
import Loading from '../molecules/loading';
const Image = dynamic(() => import('next/image'), {
  loading: () => <Loading />,
});

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  imgAlt = '',
  imgTitle,
  price_before,
  price,
  vat_rate,
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
  // interestId,
}) => {
  const [open, setOpen] = useState(false);

  // Context
  const { addToCart } = useCartContext();

  // Hooks
  const isMobile = useIsMobile();
  const { showToast } = useToast();

  // Translations
  const t = useTranslations('productDetails');
  const inputsTxt = useTranslations('Inputs');
  const msgTxts = useTranslations('Messages');

  // const { interests, addInterest, removeInterest } = useInterests();

  // **التغيير الصحيح: المقارنة باستخدام id**
  // const isInterested = productData
  //   ? interests?.some((item) => item.id === productData.id)
  //   : false;

  // const handleHeartClick = () => {
  //   if (!productData?.id) return;

  //   if (isInterested) {
  //     // استخدام interestId إذا كان متوفراً (في صفحة الاهتمامات)
  //     // أو productData.id إذا لم يكن متوفراً (في صفحات أخرى)
  //     const idToRemove = interestId || productData.id;
  //     removeInterest(Number(idToRemove));
  //   } else {
  //     addInterest(productData.id);
  //   }
  // };

  // const handleHeartClick = () => {
  //   if (!productData?.id) return;

  //   if (!productData) return;
  //   if (isInterested) {
  //     removeInterest(productData.id); // الحذف يستخدم id
  //   } else {
  //     addInterest(productData.id); // الإضافة تستقبل id لكن ترسله كـ product_id داخل الدالة
  //   }
  // };

  // حساب متوسط النجوم من الـ stars في كل rating object
  const averageRating =
    ratings && ratings?.length > 0
      ? ratings.reduce((sum: number, r: any) => sum + (r.stars || 0), 0) /
        ratings.length
      : 0; // بدل null حطينا 0

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // النجوم الممتلئة
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-sm text-yellow-500" />
      );
    }

    // النصف نجمة إن وجد
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfStroke key="half" className="text-sm text-yellow-500" />
      );
    }

    // النجوم الفارغة (نكمل إلى 5 نجوم)
    const emptyStars = 5 - (fullStars + (hasHalfStar ? 1 : 0));
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-sm text-gray-400" />
      );
    }

    return stars;
  };

  return (
    <div>
      <CardWrapper className="p-3 transform transition-transform duration-300 hover:-translate-y-2">
        <div>
          <div
            className={`relative w-full h-0 cursor-pointer ${
              tall ? 'pb-[133.33%]' : 'pb-[65%]'
            }`}
            onClick={onClick}
          >
            <Image
              src={image || '/assets/play-station.webp'}
              alt={imgAlt}
              title={imgTitle}
              fill
              className="absolute inset-0 object-cover rounded-[6px]"
            />
            {discount && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-1 rounded-lg shadow-md z-10">
                {t('rival')} {discount.amount} {discount.currency}
              </span>
            )}
          </div>

          <h3
            className={`mt-3.5 relative flex items-center justify-between ${
              variant === 'row'
                ? 'font-bold text-lg'
                : 'font-semibold inline-block mb-1.5 text-[15px] text-[var(--enjoy-gray-650)] hover:text-[var(--enjoy-gray-300)] transition-all duration-600'
            }`}
          >
            {title}
            {/* <Button
              variant="ghost"
              handleClick={handleHeartClick}
              otherClassName={`${
                isInterested
                  ? '!text-red-600'
                  : '!text-gray-300 hover:!text-red-600'
              }`}
            >
              <FaHeart
                size={18}
                className={isInterested ? 'text-red-600' : ''}
              />
            </Button> */}
          </h3>

          {showDesc && (
            <div className="mb-3 text-sm mt-2">
              <div className="flex items-center justify-between gap-2">
                {price && (
                  <h4 className="font-semibold mb-2 text-[15px]">
                    {price.amount} {price.currency}
                  </h4>
                )}
                {price_before && (
                  <h4
                    className={`font-semibold mb-2 ${
                      price
                        ? 'line-through text-gray-400 text-sm'
                        : 'text-[15px]'
                    }`}
                  >
                    {price_before.amount} {price_before.currency}
                  </h4>
                )}
              </div>

              {/* VAT Rate */}
              <div className="text-xs font-medium border border-gray-200 rounded-lg py-1 px-3 mb-2 w-fit bg-gray-100">
                {vat_rate && vat_rate > 0 ? (
                  <div className="flex items-center justify-center gap-2">
                    <p>{inputsTxt('labels.vatRate')}:</p>
                    <span className="text-red-500">
                      {parseFloat(vat_rate.toString())}%
                    </span>
                  </div>
                ) : (
                  t('vatExempt')
                )}
              </div>

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

                <div
                  className={`text-[var(--enjoy-secondary)] ${
                    variant === 'row' ? 'text-sm order-2' : 'text-base order-1'
                  } flex items-center gap-1`}
                >
                  {renderStars(averageRating)}
                  <span className="ml-1 font-semibold">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
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
                product={{
                  ...productData,
                  description: extractText(productData.description),
                  content: extractText(productData.content),
                }}
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
