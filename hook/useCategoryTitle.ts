import { useMemo } from 'react';

const mockAPITitles: Record<string, string> = {
  playstation: 'بلايستيشن',
  xbox: 'اكس بوكس',
  pubg: 'شدات ببجي',
  fortnite: 'بطاقات فورتنايت',
};

export function useCategoryTitle(slug?: string): string {
  const title = useMemo(() => {
    if (!slug) return '';
    return mockAPITitles[slug] || formatSlug(slug);
  }, [slug]);

  return title;
}

function formatSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* 
import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useLocale } from 'next-intl';

export function useCategoryTitle(slug?: string): string {
  const [title, setTitle] = useState<string>('');
  const locale = useLocale();

  useEffect(() => {
    if (!slug) {
      setTitle('');
      return;
    }

    const fetchTitle = async () => {
      try {
        const response = await axiosInstance.get(
          `/categories-subcategories/${slug}`,
          {
            headers: {
              'Accept-Language': locale, // تمرير اللغة الجديدة مباشرة
            },
          }
        );
        setTitle(response.data?.name || formatSlug(slug));
      } catch (error) {
        console.error('فشل في جلب عنوان التصنيف:', error);
        setTitle(formatSlug(slug));
      }
    };

    fetchTitle();
  }, [slug, locale]);

  return title;
}

function formatSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

*/
