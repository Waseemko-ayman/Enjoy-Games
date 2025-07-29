// components/WalletCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WalletCardProps } from '@/interfaces';

const WalletCard: React.FC<WalletCardProps> = ({
  title,
  value,
  unit,
  icon,
  bgColor,
  textColor,
  pathName,
  isUnitTranslatable = false,
}) => {
  const showIcon = (icon: React.ElementType) => {
    const Icon = icon;
    return <Icon className="w-7 h-7" />;
  };
  return (
    <Link
      href={pathName}
      className={`rounded-2xl px-5 py-8 flex flex-col justify-between h-[120px] ${bgColor} ${textColor}`}
    >
      <div className="flex items-center gap-2">
        {icon && showIcon(icon)}
        <h5 className="text-xl font-semibold">{title}</h5>
      </div>
      <div className="text-xl font-bold flex items-center gap-2 mt-2.5">
        <span>{value}</span>
        {isUnitTranslatable ? (
          <span className="text-base">{unit}</span>
        ) : (
          <Image src={unit} alt={unit} width={20} height={20} />
        )}
      </div>
    </Link>
  );
};

export default WalletCard;
