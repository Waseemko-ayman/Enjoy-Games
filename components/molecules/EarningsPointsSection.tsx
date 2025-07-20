'use client';
import Button from '@/components/atomic/Button';
import CardWrapper from '@/components/atomic/CardWrapper';
import { EarningsPointsSectionProps } from '@/interfaces';
import Image from 'next/image';
import React from 'react';
import { PiSparkleFill } from 'react-icons/pi';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

const EarningsPointsSection: React.FC<EarningsPointsSectionProps> = ({
  variant,
  totalAmount = 0,
  withdrawableAmount = 0,
  conversionRate,
  starPoints,
  lastWithdrawalText,
  firstButtonHref,
  secondButtonHref,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <CardWrapper
          bgColor="bg-enjoy-glass"
          className="p-5 flex items-center justify-between"
        >
          <div className="text-center mx-auto">
            <PiSparkleFill
              className="mx-auto mb-1 text-enjoy-secondary"
              size={40}
            />
            <h5 className="text-sm font-bold">
              {variant === 'earnings'
                ? 'الأرباح القابلة للسحب'
                : 'نقاط دليل ستار'}
            </h5>
            <div className="flex items-center justify-center gap-1 mt-2 mb-5">
              <h2 className="text-3xl font-bold">
                {variant === 'earnings' ? withdrawableAmount : starPoints}
              </h2>
              {variant === 'earnings' && (
                <Image
                  src={'/assets/saudi_riyal.png'}
                  alt="ريال سعودي"
                  width={25}
                  height={25}
                />
              )}
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button href={firstButtonHref} otherClassName="p-4 text-sm">
                تحويل لمحفظتي
              </Button>

              <Button
                href={secondButtonHref}
                variant="forth"
                otherClassName="p-4 !bg-white text-sm"
              >
                {variant === 'earnings' ? 'تحويل بنكي' : 'استبدل نقاطك'}
              </Button>
            </div>
          </div>
        </CardWrapper>
      </motion.div>

      <div>
        <div className="flex items-center gap-5 mb-5">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            className="w-full"
          >
            <CardWrapper
              bgColor="bg-enjoy-secondary-soft"
              className="p-3.5 !shadow-none w-full"
            >
              <h5 className="text-xs font-semibold mb-4">
                {variant === 'earnings'
                  ? 'إجمالي الأرباح (منذ البداية)'
                  : 'معدل تحويل النقاط الى ريال'}
              </h5>
              <div
                className={`flex items-center ${
                  variant === 'earnings' ? 'justify-between' : 'gap-1'
                }`}
              >
                {variant === 'earnings' ? (
                  <>
                    <span className="text-lg font-semibold">{totalAmount}</span>
                    <Image
                      src="/assets/saudi_riyal.png"
                      alt="ريال سعودي"
                      width={15}
                      height={15}
                    />
                  </>
                ) : (
                  <>
                    <span className="text-lg font-semibold">
                      {conversionRate} = {totalAmount}
                    </span>
                    <Image
                      src="/assets/saudi_riyal.png"
                      alt="ريال سعودي"
                      width={15}
                      height={15}
                    />
                  </>
                )}
              </div>
            </CardWrapper>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            className="w-full"
          >
            <CardWrapper
              bgColor="bg-enjoy-primary-soft"
              className="p-3.5 !shadow-none w-full"
            >
              <h5 className="text-xs font-semibold mb-4">
                {variant === 'earnings'
                  ? 'مستخدمون اشتروا من خلالك'
                  : 'إجمالي النقاط المكتسبة'}
              </h5>
              {variant === 'earnings' ? (
                <span className="text-lg font-semibold">0</span>
              ) : (
                <span className="text-lg font-semibold">0 نقطة</span>
              )}
            </CardWrapper>
          </motion.div>
        </div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <h5 className="text-base font-bold mb-3.5">
            {variant === 'earnings' ? 'سجل آخر عملية سحب' : 'سجل عمليات السحب'}
          </h5>
          <CardWrapper
            bgColor="bg-white"
            className="p-5 border border-[#f4f4f4] max-h-[100px] overflow-y-auto scrollbar-none"
          >
            {lastWithdrawalText}
          </CardWrapper>
        </motion.div>
      </div>
    </div>
  );
};

export default EarningsPointsSection;
