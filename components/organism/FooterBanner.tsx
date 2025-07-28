import Image from 'next/image';
import React from 'react';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';

const FooterBanner = () => {
  const dateNow = new Date();
  const yearNow = dateNow.getFullYear();
  const t = useTranslations('Layout.footer.footerBanner');
  return (
    <div className="flex flex-col items-center justify-between gap-4 lg:flex-row text-[var(--enjoy-glass)] py-7 overflow-hidden">
      <AnimatedWrapper direction="x" distance={40}>
        <Image src="/assets/pay/pay.png" alt="pay" width={200} height={200} />
      </AnimatedWrapper>
      <AnimatedWrapper direction="x" distance={-40}>
        <div className="flex flex-col md:flex-row items-center text-center gap-3 text-sm font-semibold">
          <p>{t('taxRegisterationNum')}: 311192285200003</p>
          <p className="hidden md:block">|</p>
          <p>
            © {t('desc')} {yearNow}
          </p>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default FooterBanner;
