import React from 'react';
import FAQCom from '@/components/organism/FAQCom';
import { faqData } from '@/data';
// import { useFAQS } from '@/context/FaqContext';

const FaqContent = () => {
  // const { faqs, isLoading } = useFAQS();
  return (
    <div>
      <FAQCom title="الأسئلة الشائعة" faqData={faqData} />
      <FAQCom title="أسئلة أخرى" faqData={faqData} />
    </div>
  );
};

export default FaqContent;
