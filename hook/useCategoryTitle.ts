// export function useCategoryTitle(slug: string) {
//   // This data will later come from the API instead of this map
//   const mockAPITitles: Record<string, string> = {
//     playstation: 'بلايستيشن',
//     xbox: 'اكس بوكس',
//     pubg: 'شدات ببجي',
//     fortnite: 'بطاقات فورتنايت',
//   };

//   /*
//     // Replace mockAPITitles with fetch or RTK Query.
//     const { data } = useQuery(['categoryTitle', slug], () => fetchTitleFromAPI(slug));
//     return data?.title || formatSlug(slug);
//   */

//   return mockAPITitles[slug] || formatSlug(slug);
// }

// function formatSlug(slug: string) {
//   return decodeURIComponent(slug)
//     .replace(/-/g, ' ')
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// }

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
import axios from 'axios';

export function useCategoryTitle(slug?: string): string {
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (!slug) {
      setTitle('');
      return;
    }

    const fetchTitle = async () => {
      try {
        const response = await axios.get(`/api/categories-subcategories/${slug}`);
        setTitle(response.data.title || formatSlug(slug));
      } catch (error) {
        console.error('Failed to fetch category title:', error);
        setTitle(formatSlug(slug)); // fallback
      }
    };

    fetchTitle();
  }, [slug]);

  return title;
}

function formatSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
*/
