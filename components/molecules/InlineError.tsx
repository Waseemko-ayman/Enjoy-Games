import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const InlineError = ({
  textColor = 'text-white',
  otherClassName,
}: {
  textColor?: string;
  otherClassName?: string;
}) => {
  const t = useTranslations('Messages');

  return (
    <span
      className={`flex items-center ${textColor} text-sm gap-1 ${otherClassName}`}
    >
      <AlertCircle className="w-4 h-4" />
      {t('errorMessage')}
    </span>
  );
};

export default InlineError;
