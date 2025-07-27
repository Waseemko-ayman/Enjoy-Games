import { Category, SubCategories } from '@/interfaces';

export const getCategoryData = async (
  category: string
): Promise<SubCategories[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories-subcategories`,
      {
        method: 'GET',
        cache: 'no-store',
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch categories for ${category}:`,
        res.statusText
      );
      return [];
    }

    const data = await res.json();
    const categories = data?.data || [];

    const currentCategory = categories.find(
      (cat: Category) => cat.slug === category
    );

    if (!currentCategory) return [];

    return currentCategory.sub_categories || [];
  } catch (error) {
    console.error('Error fetching category data:', error);
    return [];
  }
};

export const getItemData = async (
  categorySlug: string,
  itemSlug: string
): Promise<SubCategories | null> => {
  try {
    // جلب كل الفئات الفرعية تحت الفئة categorySlug
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories-subcategories`,
      {
        method: 'GET',
        cache: 'no-store',
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch categories:`, res.statusText);
      return null;
    }

    const data = await res.json();
    const categories: Category[] = data?.data || [];

    // ابحث عن الفئة التي تطابق الـ categorySlug
    const currentCategory = categories.find((cat) => cat.slug === categorySlug);

    if (!currentCategory) return null;

    // ابحث داخل الفئات الفرعية (sub_categories) عن العنصر الذي له slug مطابق
    const item = currentCategory.sub_categories.find(
      (sub) => sub.slug === itemSlug
    );

    return item || null;
  } catch (error) {
    console.error('Error fetching item data:', error);
    return null;
  }
};
