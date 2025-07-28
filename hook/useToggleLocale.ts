import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export function useToggleLocale() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isArabic = locale === 'ar';

  const toggleLocale = () => {
    const pathParts = pathname.split('/');
    const pathWithoutLocale =
      pathParts.length > 2 ? pathParts.slice(2).join('/') : '';

    const newLocale = isArabic ? 'en' : 'ar';
    router.push(`/${newLocale}/${pathWithoutLocale}`);
  };

  return { toggleLocale, isArabic };
}
