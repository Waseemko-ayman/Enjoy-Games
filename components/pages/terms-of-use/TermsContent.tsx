import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import { useTranslations } from 'next-intl';
import React from 'react';

const TermsContent = () => {
  const pageT = useTranslations('PagesHeaderTitles');
  const t = useTranslations('termsOfUse');

  const headingTitle = 'text-xl sm:text-2xl font-medium mb-2';
  const olStyle = 'list-decimal list-inside space-y-1';

  const formatText = (text: string) => {
    const parts = text.split(':');
    if (parts.length > 1) {
      return (
        <>
          <span className="font-semibold">{parts[0]}:</span>{' '}
          {parts.slice(1).join(':')}
        </>
      );
    }
    return text;
  };

  return (
    <Layer>
      <Container>
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            {pageT('terms-of-use')}
          </h2>
          <p className="mb-6">{t('intro')}</p>

          <section className="mb-6">
            <h3 className={headingTitle}>{t('userAccount.title')}</h3>
            <ol className={olStyle}>
              {t.raw('userAccount.items').map((item: string, index: number) => (
                <li key={index}>{formatText(item)}</li>
              ))}
            </ol>
          </section>

          <section className="mb-6">
            <h3 className={headingTitle}>{t('orders.title')}</h3>
            <ol className={olStyle}>
              {t.raw('orders.items').map((item: string, index: number) => (
                <li key={index}>{formatText(item)}</li>
              ))}
            </ol>
          </section>

          <section className="mb-6">
            <h3 className={headingTitle}>{t('digitalOrders.title')}</h3>
            <ol className={olStyle}>
              {t
                .raw('digitalOrders.items')
                .map((item: string, index: number) => (
                  <li key={index}>{formatText(item)}</li>
                ))}
            </ol>
          </section>

          <section className="mb-6">
            <h3 className={headingTitle}>{t('vouchers.title')}</h3>
            {t.raw('vouchers.items').map((item: string, index: number) => (
              <p key={index} className="mb-1">
                {formatText(item)}
              </p>
            ))}
          </section>

          <section className="mb-6">
            <h3 className={headingTitle}>{t('termsChanges.title')}</h3>
            {t.raw('termsChanges.items').map((item: string, index: number) => (
              <p key={index} className="mb-1">
                {formatText(item)}
              </p>
            ))}
          </section>
        </div>
      </Container>
    </Layer>
  );
};

export default TermsContent;
