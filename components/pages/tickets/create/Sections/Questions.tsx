import Button from '@/components/atomic/Button';
import CardWrapper from '@/components/atomic/CardWrapper';
import { PATHS } from '@/data/paths';
import { useTranslations } from 'next-intl';
import React from 'react';

const Questions = () => {
  const t = useTranslations('Tickets');
  const btnTexts = useTranslations('BtnTexts');
  return (
    <CardWrapper
      bgColor="bg-white"
      className="text-center p-6 hover:-translate-x-1 transition duration-500"
    >
      <h3 className="text-base font-normal mb-5">{t('searchFaqsPrompt')}</h3>
      <Button
        href={PATHS.FAQS.link}
        variant="forth"
        otherClassName="w-full py-3 px-3"
      >
        {btnTexts('faqs')}
      </Button>
    </CardWrapper>
  );
};

export default Questions;
