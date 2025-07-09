import CategoryCardsGrid from '@/components/organism/CategoryCardsGrid';
import { shoppingCarts } from '@/data';
import React from 'react';

const StorePage = () => <CategoryCardsGrid cards={shoppingCarts} />;

export default StorePage;
