import Layer from '@/components/atomic/Layer';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import ServiceCard from '@/components/molecules/ServiceCard';
import Container from '@/components/organism/Container';
import { ServiceData } from '@/data';
import { TranslationFunction } from '@/interfaces';
import React from 'react';

const ServiceAdvantages = ({ t }: { t: TranslationFunction }) => {
  return (
    <Layer>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ServiceData.map((card, index) => {
            const title = t(
              `sectionsTitles.serviceAdvantages.${card.translationKey}.title`
            );
            const description = t(
              `sectionsTitles.serviceAdvantages.${card.translationKey}.desc`
            );

            return (
              <AnimatedWrapper key={card.id} custom={index}>
                <ServiceCard
                  imgAlt={card.alt}
                  image={card.image}
                  title={title}
                  description={description}
                />
              </AnimatedWrapper>
            );
          })}
        </div>
      </Container>
    </Layer>
  );
};

export default ServiceAdvantages;
