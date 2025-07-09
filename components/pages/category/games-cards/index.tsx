import { gamingPlatforms } from '@/data';
import dynamic from 'next/dynamic';
const CategoryPage = dynamic(() => import('@/template/CategoryPage'));

import React from 'react';

const GamesCards = () => <CategoryPage cards={gamingPlatforms} />;

export default GamesCards;
