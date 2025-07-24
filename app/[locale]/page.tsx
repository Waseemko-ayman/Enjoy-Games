import MainLayout from '@/components/organism/MainLayout';
import HomePage from '@/components/pages/home';
import { Metadata } from 'next';
// import { PATHS } from '@/data/paths';
// import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | الصفحة الرئيسية',
};

const Home = () => (
  <MainLayout>
    <HomePage />
  </MainLayout>
);
// redirect(PATHS.LOGIN);

export default Home;
