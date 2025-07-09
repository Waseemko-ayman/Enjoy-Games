import { shoppingCarts } from '@/data';
import dynamic from 'next/dynamic';
const CategoryPage = dynamic(() => import('@/template/CategoryPage'));
import React from 'react';

const ShopCards = () => <CategoryPage cards={shoppingCarts} />;

export default ShopCards;
