import { servicesAndSubscriptions } from '@/data';
import dynamic from 'next/dynamic';
const CategoryPage = dynamic(() => import('@/template/CategoryPage'));
import React from 'react';

const Services = () => <CategoryPage cards={servicesAndSubscriptions} />;

export default Services;
