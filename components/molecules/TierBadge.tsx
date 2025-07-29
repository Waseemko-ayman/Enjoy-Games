import { TierBadgeProps, TranslationFunction } from '@/interfaces';
import React from 'react';
import { FaRegStar } from 'react-icons/fa6';

interface ExtendedTierBadgeProps extends TierBadgeProps {
  progress?: number;
  requiredProgress?: number;
  starsTexts: TranslationFunction;
}

const TierBadge: React.FC<ExtendedTierBadgeProps> = ({
  name,
  icon,
  isActive,
  progress = 0,
  requiredProgress = 0,
  starsTexts,
}) => {
  const isReached = progress >= requiredProgress;
  const isCurrentTier = isActive ?? isReached;

  const activeStyle = `
    text-[var(--enjoy-primary)] 
    border-[var(--enjoy-primary)] 
    bg-gradient-to-br from-purple-100 to-blue-100
    transform scale-110 
    shadow-[0_4px_12px_var(--enjoy-primary-soft)]
  `;

  const notActiveStyle = `
    text-[var(--enjoy-gray-675)] 
    bg-[var(--enjoy-gray-100)] 
    border-[var(--enjoy-gray-300)] 
    shadow-[0_4px_12px_var(--enjoy-gray-200)]
  `;

  const showIcon = (icon: React.ElementType) => {
    const Icon = icon;
    return <Icon className="w-9 h-9 mb-1" />;
  };

  return (
    <div className="text-center">
      <div
        className={`relative w-24 h-28 mx-auto mb-5 rounded-t-full rounded-b-lg
          border-2 shadow-lg flex flex-col items-center justify-center
          ${isCurrentTier ? activeStyle : notActiveStyle}
        `}
      >
        {icon && showIcon(icon)}

        <div
          className={`
            absolute -bottom-3 w-7 h-7 rounded-full border-2
            flex items-center justify-center
            ${
              isCurrentTier
                ? 'bg-enjoy-primary border-enjoy-primary-dark'
                : 'bg-[var(--enjoy-gray-300)] border-[var(--enjoy-gray-400)]'
            }
          `}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              isCurrentTier ? 'bg-white' : 'bg-[var(--enjoy-gray-500)]'
            }`}
          />
        </div>

        {isCurrentTier && (
          <>
            <div className="absolute -top-2 -left-2 w-7 h-7 bg-[var(--enjoy-primary)] rounded-full flex items-center justify-center">
              <FaRegStar className="w-3 h-3 text-white fill-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-enjoy-secondary rounded-full flex items-center justify-center">
              <FaRegStar className="w-3 h-3 text-white fill-white" />
            </div>
          </>
        )}
      </div>

      <h3
        className={`text-xs font-medium mb-1 ${
          isCurrentTier ? 'text-enjoy-primary' : 'text-[var(--enjoy-gray-600)]'
        }`}
      >
        {name}
      </h3>
      <p className="text-[15px] text-[var(--enjoy-gray-500)]">
        1 {starsTexts('percentageSection.title')}
      </p>
    </div>
  );
};

export default TierBadge;
