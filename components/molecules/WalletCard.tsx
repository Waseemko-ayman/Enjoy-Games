import React from 'react';
import Link from 'next/link';
import { WalletCardProps } from '@/interfaces';
import useIsMobile from '@/hook/useIsMobile';

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
  const isMobile = useIsMobile();
  const showIcon = (icon: React.ElementType) => {
    const Icon = icon;
    return <Icon className="w-7 h-7" />;
  };

  const titleSize = isMobile ? 'text-lg' : 'text-xl';
  return (
    <Link
      href={pathName}
      className={`rounded-2xl ${
        isMobile ? 'p-5 h-[100px]' : 'px-5 py-8 h-[120px]'
      } flex flex-col justify-between ${bgColor} ${textColor}`}
    >
      <div className="flex items-center gap-2">
        {icon && showIcon(icon)}
        <h5 className={`${titleSize} font-semibold`}>{title}</h5>
      </div>
      <div className={`${titleSize} font-bold flex items-center gap-2 mt-2.5`}>
        <div>{value}</div>
        {isUnitTranslatable && <span className="text-base">{unit}</span>}
      </div>
    </Link>
  );
};

export default WalletCard;
