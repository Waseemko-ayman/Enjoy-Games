import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const InlineError = () => {
  const t = useTranslations('Messages');

  return (
    <span className="flex items-center text-red-500 text-sm gap-1">
      <AlertCircle className="w-4 h-4" />
      {t('errorMessage')}
    </span>
  );
};

export default InlineError;
