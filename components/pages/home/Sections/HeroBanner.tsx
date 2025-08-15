/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import useAPI from '@/hook/useAPI';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// export default function HeroBanner({ sliders }: { sliders: Sliders }) {
export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ariaTxts = useTranslations('ariaLabels.btns');
  // const locale = useLocale();

  const { get, data } = useAPI('sliders');

  console.log(data);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    get();
  }, [get]);

  return (
    <AnimatedWrapper>
      <div className="relative w-full h-[150px] sm:h-[300px] overflow-hidden rounded-lg my-10">
        {/* Background Images */}
        <div className="absolute inset-0">
          {data.map((slide: any, index: number) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                // src={slide?.image?.[locale] ?? '/assets/banners/banner1.webp'}
                src={'/assets/banners/banner1.webp'}
                alt={`slide-${slide.id}`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        {/* Slide Indicators */}
        {data?.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
            {data?.map((banner: any, index: number) => (
              <AnimatedWrapper key={banner.id} custom={index}>
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={ariaTxts('goToSlide', { number: index + 1 })}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-enjoy-primary scale-110 sm:scale-125'
                      : 'bg-enjoy-primary-soft hover:bg-white/75'
                  }`}
                />
              </AnimatedWrapper>
            ))}
          </div>
        )}
        {/* Progress Bar */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/20 z-10">
        <div
          className="h-full bg-enjoy-primary transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / data.length) * 100}%`,
          }}
        />
      </div> */}
      </div>
    </AnimatedWrapper>
  );
}
