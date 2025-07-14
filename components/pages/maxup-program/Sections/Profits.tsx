import Button from '@/components/atomic/Button';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import EarningsPointsSection from '@/components/molecules/EarningsPointsSection';
import Container from '@/components/organism/Container';
import React from 'react';
import { FaCopy } from 'react-icons/fa6';
import { MdWavingHand } from 'react-icons/md';

const Profits = () => {
  return (
    <Layer>
      <Container>
        <SectionTitle
          title="أهلًا بك في مكسب من دليل ستور!"
          subtitle="اربح نسبة من كل عملية شراء يقوم بها أصدقاؤك، وكل ما شاركت أكثر، زاد مكسبك!"
          Icon={MdWavingHand}
          className="!mb-5"
        />
        <div className="flex items-center justify-center gap-4 mb-10">
          <Button otherClassName="py-3 px-10" Icon={FaCopy}>
            نسخ الرابط الخاص بي
          </Button>
          <Button variant="forth" otherClassName="py-3 px-10">
            تعرف على مكسب
          </Button>
        </div>

        <EarningsPointsSection
          variant="earnings"
          totalAmount={0}
          withdrawableAmount={0}
          lastWithdrawalText="لا توجد عمليات سحب"
        />
      </Container>
    </Layer>
  );
};

export default Profits;
