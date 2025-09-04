import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import { useTranslations } from 'next-intl';
import React from 'react';

const RefundContent = () => {
  const pageT = useTranslations('PagesHeaderTitles');
  const t = useTranslations('refundPolicy');

  const sectionClass = 'mb-8';
  const headingClass = 'text-xl sm:text-2xl font-medium mb-2 text-[#53576e]';

  const steps: string[] = t.raw('steps') as string[];

  return (
    <Layer>
      <Container>
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#53576e]">
            {pageT('refund-policy')}
          </h2>
          <p className="mb-6">{t('intro')}</p>

          <section className={sectionClass}>
            <ol className="list-decimal list-inside space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="font-medium">
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className={sectionClass}>
            <h3 className={headingClass}>{t('needHelpTitle')}</h3>
            <p>{t('needHelpText')}</p>
          </section>
        </div>
      </Container>
    </Layer>
  );
};

export default RefundContent;
