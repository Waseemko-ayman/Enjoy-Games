import Button from '@/components/atomic/Button';
import CardWrapper from '@/components/atomic/CardWrapper';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import Container from '@/components/organism/Container';
import Image from 'next/image';
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <CardWrapper bgColor="bg-enjoy-glass" className="py-[60px] px-5">
            <div className="text-center">
              <h5 className="text-sm font-bold">الأرباح القابلة للسحب</h5>
              <div className="flex items-center justify-center gap-1 mt-2 mb-5">
                <h2 className="text-3xl font-bold">0</h2>
                <Image
                  src="/assets/saudi_riyal.png"
                  alt="saudi_riyal"
                  width={25}
                  height={25}
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button otherClassName="p-4 text-sm">تحويل لمحفظتي</Button>
                <Button variant="forth" otherClassName="p-4 !bg-white text-sm">
                  تحويل بنكي
                </Button>
              </div>
            </div>
          </CardWrapper>
          <div>
            <div className="flex items-center gap-5 mb-5">
              <CardWrapper
                bgColor="bg-enjoy-secondary-soft"
                className="p-3.5 !shadow-none w-full"
              >
                <h5 className="text-xs font-semibold mb-4">
                  إجمالي الأرباح (منذ البداية)
                </h5>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">0</span>
                  <Image
                    src="/assets/saudi_riyal.png"
                    alt="saudi_riyal"
                    width={15}
                    height={15}
                  />
                </div>
              </CardWrapper>

              <CardWrapper
                bgColor="bg-enjoy-primary-soft"
                className="p-3.5 !shadow-none w-full"
              >
                <h5 className="text-xs font-semibold mb-4">
                  مستخدمون اشتروا من خلالك
                </h5>
                <span className="text-lg font-semibold">0</span>
              </CardWrapper>
            </div>
            <div>
              <h5 className="text-base font-bold mb-3.5">سجل آخر عملية سحب</h5>
              <CardWrapper
                bgColor="bg-white"
                className="p-5 border border-[#f4f4f4]"
              >
                لا توجد عمليات سحب
              </CardWrapper>
            </div>
          </div>
        </div>
      </Container>
    </Layer>
  );
};

export default Profits;
