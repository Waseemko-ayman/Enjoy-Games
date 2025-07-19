import React from 'react';
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@/components/pages/home'), {
  ssr: false,
});

const Home = () => <HomePage />;

export default Home;
