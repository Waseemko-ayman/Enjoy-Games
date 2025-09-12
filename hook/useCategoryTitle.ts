/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from 'react';
// import axiosInstance from '@/utils/axiosInstance';
// import { useLocale } from 'next-intl';

// export function useCategoryTitle(slug?: string): string {
//   const [title, setTitle] = useState<string>('');
//   const locale = useLocale();

//   useEffect(() => {
//     if (!slug) {
//       setTitle('');
//       return;
//     }

//     const fetchTitle = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `/categories-subcategories/${slug}`
//         );
//         setTitle(response.data?.name || formatSlug(slug));
//       } catch (error) {
//         console.error('فشل في جلب عنوان التصنيف:', error);
//         setTitle(formatSlug(slug));
//       }
//     };

//     fetchTitle();
//   }, [slug, locale]);

//   return title;
// }

// function formatSlug(slug: string) {
//   return decodeURIComponent(slug)
//     .replace(/-/g, ' ')
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// }

import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useLocale } from 'next-intl';

export function useCategoryTitle(slug?: string): {
  title: string;
  loading: boolean;
} {
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const locale = useLocale();

  useEffect(() => {
    if (!slug) {
      setTitle('');
      return;
    }

    setLoading(true);

    const fetchTitle = async () => {
      try {
        const response = await axiosInstance.get(`/categories-subcategories`);
        const categories = response.data;

        const foundCategory = Array.isArray(categories)
          ? categories.find((cat: any) => cat.slug === slug)
          : null;

        setTitle(foundCategory?.name || formatSlug(slug));
      } catch (error) {
        console.error('فشل في جلب عنوان التصنيف:', error);
        setTitle(formatSlug(slug));
      } finally {
        setLoading(false);
      }
    };

    fetchTitle();
  }, [slug, locale]);

  return { title, loading };
}

function formatSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\d+/g, '');
}
