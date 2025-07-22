export function useCategoryTitle(slug: string) {
  // This data will later come from the API instead of this map
  const mockAPITitles: Record<string, string> = {
    playstation: 'بلايستيشن',
    xbox: 'اكس بوكس',
    pubg: 'شدات ببجي',
    fortnite: 'بطاقات فورتنايت',
  };

  /*
    // Replace mockAPITitles with fetch or RTK Query.
    const { data } = useQuery(['categoryTitle', slug], () => fetchTitleFromAPI(slug));
    return data?.title || formatSlug(slug);
  */

  return mockAPITitles[slug] || formatSlug(slug);
}

function formatSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
