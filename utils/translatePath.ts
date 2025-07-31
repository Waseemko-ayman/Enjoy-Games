// import { useTranslations } from 'next-intl';
// import { useCategoryTitle } from '@/hook/useCategoryTitle';

// export function useTranslatedPathParts(pathname: string) {
//   const tPages = useTranslations('PagesHeaderTitles');

//   const pathParts = pathname
//     .split('/')
//     .filter(Boolean)
//     .filter((part, index) => !(index === 0 && ['en', 'ar'].includes(part)));

//   const categoryIndex = pathParts.indexOf('categories');
//   const categorySlug =
//     categoryIndex !== -1 && pathParts[categoryIndex + 1]
//       ? pathParts[categoryIndex + 1]
//       : '';

//   const categoryLabel = useCategoryTitle(categorySlug);

//   function translatePart(part: string) {
//     // إذا الجزء يحتوي أرقام أو شرطات نفك تشفيره ونعرضه كما هو مع استبدال الشرطات
//     if (/[\d\-]/.test(part)) {
//       return decodeURIComponent(part).replace(/-/g, ' ');
//     }

//     const translated = tPages(part);
//     if (translated === part) {
//       // إذا لم توجد ترجمة، نفك تشفير ونحوّل الحروف الأولى للكلمة إلى كبيرة
//       return decodeURIComponent(part)
//         .replace(/-/g, ' ')
//         .replace(/\b\w/g, (c) => c.toUpperCase());
//     }
//     return translated;
//   }

//   const translatedParts = pathParts.map((part, i) => {
//     if (part === 'categories' && pathParts[i + 1]) {
//       // بالنسبة لـ categories، نستخدم عنوان التصنيف من الـ hook
//       return categoryLabel || translatePart(pathParts[i + 1]);
//     }
//     return translatePart(part);
//   });

//   return translatedParts;
// }
