import { FeatureCardProps } from '@/interfaces';
import React from 'react';

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  bgColor,
  textColor,
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-3.5 ${textColor}`}>
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-lg font-bold">{title}</h4>
        {Icon && <Icon className="text-sm" />}
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
