import AboutPage from '@/components/pages/about';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | من نحن',
};

const About = () => <AboutPage />;

export default About;
