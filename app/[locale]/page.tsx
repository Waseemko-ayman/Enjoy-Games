import { Metadata } from 'next';
import MainLayout from '@/components/organism/MainLayout';
import HomePage from '@/components/pages/home';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | الصفحة الرئيسية',
};

const Home = () => (
  <MainLayout>
    <HomePage />
  </MainLayout>
);

export default Home;
