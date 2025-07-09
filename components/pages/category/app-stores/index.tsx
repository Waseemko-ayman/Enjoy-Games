import { digitalStores } from '@/data';
import dynamic from 'next/dynamic';
const CategoryPage = dynamic(() => import('@/template/CategoryPage'));
import React from 'react';

const AppStores = () => <CategoryPage cards={digitalStores} />;

export default AppStores;
