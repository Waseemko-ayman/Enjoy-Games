import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const PrivacyContent = () => {
  const pageT = useTranslations('PagesHeaderTitles');
  const t = useTranslations('privacyPolicy');
  const labelT = useTranslations('Inputs.labels');

  const definitionsItems = t.raw('definitions.items') as string[];
  const trackingCookiesDetails = t.raw('tracking.cookiesDetails') as string[];
  const usageList = t.raw('usage.list') as unknown as string[];

  const headingTitle = 'text-xl sm:text-2xl font-medium mb-2';
  const listStyle = 'list-disc list-inside space-y-1 mr-4';

  return (
    <Layer>
      <Container>
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-semibold mb-4">
            {pageT('privacy-policy')}
          </h2>
          <p className="mb-6">{t('intro')}</p>

          <section className="mb-6">
            <h3 className={headingTitle}>{t('definitions.title')}</h3>
            <ul className={listStyle}>
              {definitionsItems.map((item: string, index: number) => {
                const [label, description] = item.split(/:(.+)/);
                return (
                  <li key={index}>
                    <span className="font-semibold">{label}:</span>
                    <span> {description}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mb-6">
            <h3 className={headingTitle}>{t('collection.title')}</h3>
            <h4 className="text-xl font-semibold my-3">
              {t('collection.types.title')}
            </h4>

            <div className="mb-2">
              <span className="font-semibold">
                {t('collection.personalData')}:
              </span>
              <ul className="list-disc list-inside mr-4 mt-1">
                {(t.raw('collection.types.personal') as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            <div className="mb-2">
              <span className="font-semibold">
                {t('collection.usageData')}:
              </span>
              <ul className="list-disc list-inside mr-4 mt-1">
                {(t.raw('collection.types.usage') as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            <div className="mb-2">
              <span className="font-semibold">
                {t('collection.mobileData')}:
              </span>
              <ul className="list-disc list-inside mr-4 mt-1">
                {(t.raw('collection.types.mobile') as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
          </section>

          <section className="mb-6">
            <h3 className={headingTitle}>{t('tracking.title')}</h3>
            <p className="mb-2">{t('tracking.cookiesIntro')}</p>
            <ul className={`${listStyle} mb-2`}>
              {trackingCookiesDetails.map((detail: string, index: number) => {
                const [label, description] = detail.split(/:(.+)/); // تقسيم على أول ":"
                return (
                  <li key={index}>
                    {description ? (
                      <>
                        <span className="font-semibold">{label}:</span>
                        <span> {description}</span>
                      </>
                    ) : (
                      <span>{label}</span> // إذا لم يكن هناك ":"
                    )}
                  </li>
                );
              })}
            </ul>

            <p>{t('tracking.cloudflare')}</p>
          </section>

          <section className="mb-6">
            <h3 className={headingTitle}>{t('usage.title')}</h3>
            <ul className={listStyle}>
              {usageList.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {[
            'retention',
            'deletion',
            'security',
            'children',
            'externalLinks',
            'updates',
          ].map((section) => (
            <section key={section} className="mb-6">
              <h3 className={headingTitle}>{t(`${section}.title`)}</h3>
              <p>{t(`${section}.text`)}</p>
            </section>
          ))}

          <section className="mb-6">
            <h3 className={headingTitle}>{t('contact.title')}</h3>
            <p>{t('contact.text')}</p>
            <p>
              {labelT('email')}:{' '}
              <Link
                href={`mailto:${t('contact.email')}`}
                className="text-blue-600 hover:underline"
              >
                {t('contact.email')}
              </Link>
            </p>
            <p>
              {t('contact.websiteTilte')}:{' '}
              <Link
                href={t('contact.website')}
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                {t('contact.website')}
              </Link>
            </p>
          </section>
        </div>
      </Container>
    </Layer>
  );
};

export default PrivacyContent;
