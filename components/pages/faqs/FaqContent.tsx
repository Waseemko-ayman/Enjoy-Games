import React from 'react';
import { faqsData } from '@/data';
import FAQSCom from '@/components/organism/FAQSCom';
// import { useFAQS } from '@/context/FaqContext';

const FaqsContent = () => {
  // const { faqs, isLoading } = useFAQS();
  return (
    <div>
      <FAQSCom title="الأسئلة الشائعة" faqsData={faqsData} />
      <FAQSCom title="أسئلة أخرى" faqsData={faqsData} />
    </div>
  );
};

export default FaqsContent;
