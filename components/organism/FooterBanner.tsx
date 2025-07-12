import Image from 'next/image';
import React from 'react';

const FooterBanner = () => {
  const dateNow = new Date();
  const yearNow = dateNow.getFullYear();
  return (
    <div className="flex flex-col items-center justify-between gap-4 lg:flex-row text-[var(--enjoy-glass)] py-7">
      {/* <div className='flex items-center gap-1'> */}
      <div>
        <Image src="/assets/pay/pay.png" alt="pay" width={200} height={200} />
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 text-sm font-semibold">
        <p>رقم التسجيل الضريبي: 311192285200003</p>
        <p className="hidden md:block">|</p>
        <p>© شركة إنجوي قيمز لتقنية المعلومات شركة شخص واحد {yearNow}</p>
      </div>
    </div>
  );
};

export default FooterBanner;
