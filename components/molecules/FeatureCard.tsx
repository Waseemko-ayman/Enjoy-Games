import { FeatureCardProps } from '@/interfaces';
import React from 'react';

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  bgColor,
  textColor,
  descClassName,
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-3.5 ${textColor}`}>
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-[15px] font-semibold">{title}</h4>
        {Icon && <Icon className="text-sm" />}
      </div>
      <p className={descClassName}>{description}</p>
    </div>
  );
};

export default FeatureCard;
