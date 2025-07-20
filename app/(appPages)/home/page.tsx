import HomePage from '@/components/pages/home';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | الصفحة الرئيسية',
};

const Home = () => <HomePage />;

export default Home;
