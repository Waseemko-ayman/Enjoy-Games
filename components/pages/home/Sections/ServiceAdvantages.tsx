import Layer from '@/components/atomic/Layer';
import ServiceCard from '@/components/molecules/ServiceCard';
import Container from '@/components/organism/Container';
import { ServiceData } from '@/data';
import React from 'react';

const ServiceAdvantages = () => {
  return (
    <Layer>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ServiceData.map((card) => (
            <ServiceCard key={card.id} imgAlt={card.alt} {...card} />
          ))}
        </div>
      </Container>
    </Layer>
  );
};

export default ServiceAdvantages;
