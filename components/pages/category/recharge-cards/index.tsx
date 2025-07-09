import { contactAndData } from '@/data';
import dynamic from 'next/dynamic';
const CategoryPage = dynamic(() => import('@/template/CategoryPage'));
import React from 'react';

const RechargeCards = () => <CategoryPage cards={contactAndData} />;

export default RechargeCards;
