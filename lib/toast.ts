import { toast, ToastOptions } from 'react-toastify';
import useIsMobile from '@/hook/useIsMobile';
import { useToggleLocale } from '@/hook/useToggleLocale';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const useToast = () => {
  const isMobile = useIsMobile();
  const { isArabic } = useToggleLocale();

  const getBaseConfig = (): ToastOptions => ({
    position: (isArabic ? 'top-right' : 'top-left') as 'top-right' | 'top-left',
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    className: '!max-w-[95vw] !w-auto !min-w-[300px] !z-[9999]',
    style: {
      top: isMobile ? '40px' : undefined,
    },
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    const config = getBaseConfig();
    toast[type](message, config);
  };

  return { showToast };
};
