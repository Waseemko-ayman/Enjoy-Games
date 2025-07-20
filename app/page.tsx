import MainLayout from '@/components/organism/MainLayout';
import HomePage from '@/components/pages/home';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | الصفحة الرئيسية',
};

const Home = () => (
  <MainLayout>
    <HomePage />
  </MainLayout>
);

export default Home;
