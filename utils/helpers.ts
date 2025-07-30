// helpers/getSlugs.ts
import { Category } from '@/interfaces';

export const getCategoryAndSubCategorySlugs = (
  categories: Category[],
  subCategoryId: number
): { categorySlug: string; subCategorySlug: string } | null => {
  for (const category of categories) {
    const sub = category.sub_categories.find((s) => s.id === subCategoryId);
    if (sub) {
      return {
        categorySlug: category.slug || '',
        subCategorySlug: sub.slug || '',
      };
    }
  }
  return null;
};
