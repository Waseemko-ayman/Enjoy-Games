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
    return <Icon className={isMobile ? 'w-5 h-5' : 'w-7 h-7'} />;
  };

  const titleSize = isMobile ? 'text-base' : 'text-xl';
  return (
    <Link
      href={pathName}
      className={`rounded-2xl ${
        isMobile ? 'p-3' : 'p-5'
      } flex flex-col justify-center ${bgColor} ${textColor}`}
    >
      <div className="flex items-center gap-2">
        {icon && showIcon(icon)}
        <h5 className={`${titleSize} font-semibold`}>{title}</h5>
      </div>
      <div
        className={`${titleSize} ${
          isMobile ? 'text-[15px]' : 'text-base'
        } font-bold flex items-center gap-2 mt-2.5`}
      >
        <div>{value}</div>
        {isUnitTranslatable && <span>{unit}</span>}
      </div>
    </Link>
  );
};

export default WalletCard;
