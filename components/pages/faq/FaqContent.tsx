import FAQCom from '@/components/organism/FAQCom';
import { faqData } from '@/data';
import React from 'react';

const FaqContent = () => {
  return (
    <div>
      <FAQCom title="الأسئلة الشائعة" faqData={faqData} />
      <FAQCom title="أسئلة أخرى" faqData={faqData} />
    </div>
  );
};

export default FaqContent;
