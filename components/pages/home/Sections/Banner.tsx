'use client';

import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { BannerProps } from '@/interfaces';

export default function Banner({ images }: BannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const setupCarousel = () => {
      setCount(images.length);
      setCurrent((emblaApi.selectedScrollSnap() % images.length) + 1);
    };

    const onSelect = () => {
      setCurrent((emblaApi.selectedScrollSnap() % images.length) + 1);
    };

    setupCarousel();
    emblaApi.on('select', onSelect);

    const autoplayInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);

    return () => {
      clearInterval(autoplayInterval);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, images.length]);

  return (
    <div className="relative overflow-hidden w-full mb-20">
      <div className="relative">
        {/* Navigation buttons */}
        <div className="hidden sm:block">
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-all z-50 cursor-pointer"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-all z-50 cursor-pointer"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Slider container */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing w-full"
          ref={emblaRef}
        >
          <div className="flex w-full">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 relative"
                style={{ flex: '0 0 100%' }}
              >
                <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    priority={index === 0}
                    unoptimized={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots navigation */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 select-none">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  current === index + 1
                    ? 'bg-black w-6'
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile navigation buttons */}
        {images.length > 1 && (
          <div className="flex sm:hidden justify-center gap-4 mt-4">
            <button
              onClick={scrollPrev}
              className="bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all"
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all"
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
