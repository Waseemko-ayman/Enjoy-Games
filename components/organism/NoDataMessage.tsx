import { Package } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface NoDataMessageProps {
  variant?: 'full' | 'iconOnly';
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({
  variant = 'full',
}) => {
  const t = useTranslations('Messages');
  return (
    <div
      className={`flex ${
        variant === 'full' ? 'flex-col' : 'flex-row gap-2 py-3'
      } items-center justify-center px-6 text-center`}
    >
      <div
        className={`${
          variant === 'full' ? 'mb-4' : ''
        } text-muted-foreground/50`}
      >
        <Package className={variant === 'full' ? 'w-12 h-12' : 'w-7 h-7'} />
      </div>

      <h3
        className={`text-lg font-semibold text-foreground ${
          variant === 'full' ? 'mb-2' : ''
        } font-sans`}
      >
        {t('noDataAvailable')}
      </h3>

      {variant === 'full' && (
        <p className="text-muted-foreground text-sm max-w-sm text-pretty">
          {t('noDataAvailableDesc')}
        </p>
      )}
    </div>
  );
};

export default NoDataMessage;
