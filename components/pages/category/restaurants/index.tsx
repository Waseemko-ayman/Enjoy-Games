import { restaurants } from '@/data';
import dynamic from 'next/dynamic';
const CategoryPage = dynamic(() => import('@/template/CategoryPage'));
import React from 'react';

const Restaurants = () => <CategoryPage cards={restaurants} />;

export default Restaurants;
