import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import React from 'react';

const ProductDetailsTabContent = () => {
  return (
    <div className="mt-3">
      <MotionSection index={1}>
        <h5 className="text-lg font-semibold mb-5 text-center">
          شحن توكنز لعبة جواكر بالايدي
        </h5>
      </MotionSection>
      <MotionSection index={2}>
        <p className="text-[15px] leading-6 text-right">
          تعد لعبة جواكر هي مجمع لأكثر من 30 لعبة ورق عربية، تمكنك اللعبة من
          التعرف على المزيد من الأصدقاء وتكوين صداقات جديدة مع أشخاص لديهم نفس
          الاهتمام والشغف، تعرف على أصدقاء جدد وشاركهم اللعب بضغطة زر واحدة.
        </p>
      </MotionSection>
    </div>
  );
};

export default ProductDetailsTabContent;
