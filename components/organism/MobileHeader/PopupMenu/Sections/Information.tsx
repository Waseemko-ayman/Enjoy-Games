'use client';
import Avatar from '@/components/atomic/Avatar';
import CardWrapper from '@/components/atomic/CardWrapper';
import { Wallet } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { PiStarFourFill } from 'react-icons/pi';

const Information = () => {
  const [accountAdvance] = useState(20);
  const infoStyle = 'flex items-center gap-2 text-sm font-semibold';
  return (
    <CardWrapper
      bgColor="bg-white"
      className="py-3 px-5 shadow-[0_8.293px_37.319px_4.147px_rgba(0,0,0,0.08)] mt-8"
    >
      <div className="flex items-center gap-3">
        <Avatar
          imgSrc="/assets/user-avatar.png"
          imgAlt="character"
          width={30}
          height={30}
        />
        <h5 className="text-base font-semibold">أكمل بيانات حسابك الآن</h5>
      </div>

      <div className="flex items-center justify-between gap-2 mb-3">
        {/* Background Line */}
        <div className="h-[3px] bg-gray-300 w-full rounded-full relative">
          {/* Active Line inside */}
          <div
            className="h-[3px] bg-enjoy-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${accountAdvance}%` }}
          ></div>
        </div>
        <span className="text-sm font-semibold">{accountAdvance}%</span>
      </div>

      <div className={`mb-2 ${infoStyle}`}>
        <Wallet size={18} />
        <div className="flex items-center gap-2">
          <span>0</span>
          <Image
            src={'/assets/saudi_riyal.png'}
            alt="ريال سعودي"
            width={15}
            height={15}
          />
        </div>
      </div>

      <div className={`text-[var(--enjoy-secondary))] ${infoStyle}`}>
        <PiStarFourFill size={18} />
        <div className="flex items-center gap-2">
          <span>0</span>
          <span>نقاط دليل ستارز</span>
        </div>
      </div>
    </CardWrapper>
  );
};

export default Information;
