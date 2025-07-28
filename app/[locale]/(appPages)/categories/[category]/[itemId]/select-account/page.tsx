// import { getItemData } from '@/lib/mockData';
// import { paramsProps } from '@/interfaces';
// import SelectAccountPage from '@/components/pages/SelectAccount';

// export default function SelectAccountWrapper({
//   params,
// }: {
//   params: paramsProps;
// }) {
//   // حالياً بدون جلب بيانات
//   return <SelectAccountPage accounts={[]} />;
// }

// export default async function SelectAccountWrapper({
//   params,
// }: {
//   params: paramsProps;
// }) {
//   const item = await getItemData(params.category, params.itemId);

//   if (!item) return <div>العنصر غير موجود.</div>;

//   const accounts = item.accounts || [];

//   return <SelectAccountPage accounts={accounts} />;
// }
