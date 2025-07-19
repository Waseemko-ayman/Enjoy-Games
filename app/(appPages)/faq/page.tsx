import React from 'react';
import dynamic from 'next/dynamic';

const FAQPage = dynamic(() => import('@/components/pages/faq'), {
  ssr: false,
});

const FAQ = () => <FAQPage />;

export default FAQ;
