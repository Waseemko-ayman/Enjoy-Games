// components/WalletCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WalletCardProps } from '@/interfaces';

const imageUnits = ['saudi_riyal'];

const WalletCard: React.FC<WalletCardProps> = ({
  title,
  value,
  unit,
  Icon,
  bgColor,
  textColor,
  pathName,
}) => {
  const isImageUnit = imageUnits.includes(unit);

  return (
    <Link
      href={pathName}
      className={`rounded-2xl px-5 py-8 flex flex-col justify-between h-[120px] ${bgColor} ${textColor}`}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-7 h-7" />}
        <h5 className="text-xl font-semibold">{title}</h5>
      </div>
      <div className="text-xl font-bold flex items-center gap-1 mt-2.5">
        <span>{value}</span>
        {isImageUnit ? (
          <Image
            src={`/assets/${unit}.png`}
            alt={unit}
            width={20}
            height={20}
          />
        ) : (
          <span className="text-sm">{unit}</span>
        )}
      </div>
    </Link>
  );
};

export default WalletCard;
