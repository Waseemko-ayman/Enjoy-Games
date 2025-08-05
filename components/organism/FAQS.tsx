'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import SectionTitle from '@/components/atomic/SectionTitle';
import CardWrapper from '@/components/atomic/CardWrapper';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useFAQS } from '@/context/FaqContext';
import { useTranslations } from 'next-intl';
import Loading from '../molecules/loading';
import ErrorFetching from '../molecules/ErrorFetching';
import { FAQSDataType } from '@/interfaces';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';

const FAQS = ({ showTitle = false }: { showTitle?: boolean }) => {
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);

  const { faqs, isLoading, error } = useFAQS();
  const titleTxt = useTranslations('SectionsTitles');

  return (
    <Layer>
      <Container>
        {showTitle && (
          <SectionTitle
            title={titleTxt('faqs')}
            className="!mb-3"
            titleClassName="!text-2xl !text-start"
          />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Accordion
            type="single"
            collapsible
            className="max-w-full pt-4"
            value={activeItem}
            onValueChange={setActiveItem}
          >
            {isLoading ? (
              <Loading />
            ) : error ? (
              <ErrorFetching />
            ) : (
              faqs &&
              faqs.map((item: FAQSDataType, index: number) => (
                <AnimatedWrapper key={item.id} custom={index}>
                  <CardWrapper className="mb-4 px-4 py-2">
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="font-normal hover:no-underline transition-colors w-full cursor-pointer">
                        <p className="text-right text-sm md:text-base w-full font-semibold">
                          {item.question}
                        </p>
                      </AccordionTrigger>
                      <AccordionContent className="px-3">
                        <div className="prose prose-sm prose-invert max-w-none text-[14px] md:text-base">
                          {item.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </CardWrapper>
                </AnimatedWrapper>
              ))
            )}
          </Accordion>
        </motion.div>
      </Container>
    </Layer>
  );
};

export default FAQS;
