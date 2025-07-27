// // import { getItemData } from '@/lib/mockData';
// // import BundlesPage from '@/components/pages/BundlesPage';
// // import { paramsProps } from '@/interfaces';
// // import { Metadata } from 'next';

// // export async function generateMetadata({
// //   params,
// // }: {
// //   params: Promise<paramsProps>;
// // }): Promise<Metadata> {
// //   const resolvedParams = await params;
// //   const categoryName = resolvedParams.category;

// //   return {
// //     title: `إنجوي قيمز | ${categoryName} | ${resolvedParams.itemId}`,
// //     description: `تصفح المنتجات في فئة ${categoryName} على موقعنا.`,
// //   };
// // }

// // export default async function BundlesWrapper({
// //   params,
// //   searchParams,
// // }: {
// //   params: paramsProps;
// //   searchParams?: { account?: string };
// // }) {
// //   const item = await getItemData(
// //     params.category,
// //     params.itemId,
// //     searchParams?.account
// //   );

// //   if (!item) return <div>العنصر غير موجود.</div>;

// //   return <BundlesPage item={item} params={params} />;
// // }

// import { getItemData } from '@/lib/mockData';
// import BundlesPage from '@/components/pages/BundlesPage';
// import { paramsProps } from '@/interfaces';
// import { Metadata } from 'next';

// // 1. تعديل تعريف generateMetadata
// export async function generateMetadata({
//   params,
// }: {
//   params: paramsProps; // تغيير من Promise<paramsProps> إلى paramsProps مباشرة
// }): Promise<Metadata> {
//   const categoryName = params.category;

//   return {
//     title: `إنجوي قيمز | ${categoryName} | ${params.itemId}`,
//     description: `تصفح المنتجات في فئة ${categoryName} على موقعنا.`,
//   };
// }

// // 2. تعريف نوع Props بشكل صريح
// interface PageProps {
//   params: paramsProps;
//   searchParams?: { account?: string };
// }

// export default async function BundlesWrapper({
//   params,
//   searchParams,
// }: PageProps) {
//   const item = await getItemData(
//     params.category,
//     params.itemId,
//     searchParams?.account
//   );

//   if (!item) return <div>العنصر غير موجود.</div>;

//   return <BundlesPage item={item} params={params} />;
// }

import { getItemData } from '@/lib/mockData';
import BundlesPage from '@/components/pages/BundlesPage';
import { paramsProps } from '@/interfaces';

export async function generateMetadata({ params }: { params: paramsProps }) {
  return {
    title: `إنجوي قيمز | ${params.category} | ${params.itemId}`,
    description: `تصفح المنتجات في فئة ${params.category} على موقعنا.`,
  };
}

export default async function BundlesWrapper({
  params,
}: {
  params: paramsProps;
}) {
  const item = await getItemData(params.category, params.itemId);

  if (!item) return <div>العنصر غير موجود.</div>;

  return <BundlesPage item={item} params={params} />;
}
