import CardWrapper from '@/components/atomic/CardWrapper';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import FeatureCard from '@/components/molecules/FeatureCard';
import Container from '@/components/organism/Container';
import { featuresData } from '@/data';
import { PATHS } from '@/data/paths';
import Link from 'next/link';
import React from 'react';
import { MdWavingHand } from 'react-icons/md';
import { PiStarFourFill } from 'react-icons/pi';

const WelcomeSection = () => {
  return (
    <Layer>
      <Container>
        <SectionTitle
          title="أهلًا بك في إنجوي قيمز"
          subtitle="اشتري أكثر واكسب الضعف واستبدل نقاطك ببطاقات!"
          Icon={MdWavingHand}
        />

        {/* Main Content Card */}
        <CardWrapper className="p-8 mb-8">
          {/* Title with sparkle */}
          <div className="text-center mb-8 p-3 rounded-2xl border border-gray-200">
            <h2 className="text-xl font-bold text-[var(--enjoy-secondary)] flex items-center justify-center gap-2">
              <PiStarFourFill className="w-6 h-6" />
              كلما اشتريت أكثر، كلما كسبت أكثر!
            </h2>
          </div>

          {/* Description */}
          <p className="text-center mb-3 leading-relaxed text-lg">
            إنجوي قيمز هو نظام ولاء يمنحك نقاطاً عند كل عملية شراء، والتي يمكنك
            استبدالها ببطاقات رقمية أو تحويلها إلى نقاط في محفظتك.
          </p>

          {/* How it works section */}
          <h3 className="text-xl font-bold text-center mb-3">
            كيف يعمل إنجوي قيمز؟
          </h3>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {featuresData.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center flex items-center gap-1 justify-center text-xl font-bold">
            <Link
              href={PATHS.SIGN_UP}
              className="text-enjoy-primary hover:text-enjoy-primary-soft transition-all duration-300"
            >
              سجل الآن
            </Link>
            <p>وحقق أقصى استفادة من مشترياتك! 🔥</p>
          </div>
        </CardWrapper>
      </Container>
    </Layer>
  );
};

export default WelcomeSection;
