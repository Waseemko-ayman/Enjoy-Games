import Layer from '@/components/atomic/Layer';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import RewardCard from '@/components/molecules/RewardCard';
import Container from '@/components/organism/Container';
import { EnjoyWinWinData } from '@/data';
import { TranslationFunction } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const EnjoyWinWin = ({ t }: { t: TranslationFunction }) => {
  const tBtn = useTranslations('BtnTexts');
  return (
    <Layer otherClassName="bg-[var(--enjoy-glass-lavender)]">
      <Container otherClassName="py-[70px]">
        <AnimatedWrapper>
          <h2 className="text-3xl font-semibold mb-6 max-sm:text-center">
            {t('sectionsTitles.enjoyWinWin.title')}
          </h2>
        </AnimatedWrapper>
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-6">
          {EnjoyWinWinData.map((sec, index) => {
            const title = t(
              `sectionsTitles.enjoyWinWin.${sec.translationKey}.title`
            );
            const description = t(
              `sectionsTitles.enjoyWinWin.${sec.translationKey}.desc`
            );
            const buttonText = tBtn(sec.buttonTextKey);
            return (
              <AnimatedWrapper key={sec.id} custom={index}>
                <RewardCard
                  title={title}
                  description={description}
                  image={sec.image}
                  buttonText={buttonText}
                  href={sec.href}
                />
              </AnimatedWrapper>
            );
          })}
        </div>
      </Container>
    </Layer>
  );
};

export default EnjoyWinWin;
