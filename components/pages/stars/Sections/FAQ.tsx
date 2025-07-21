/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layer from '@/components/atomic/Layer';
import { faqData } from '@/data';
import CardWrapper from '@/components/atomic/CardWrapper';
import Container from '@/components/organism/Container';
import SectionTitle from '@/components/atomic/SectionTitle';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';

const FAQ = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const t = useTranslations('SectionsTitles');

  return (
    <Layer>
      <Container>
        <SectionTitle
          title={t('faq')}
          className="!mb-3"
          titleClassName="!text-2xl"
        />

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
            value={activeItem || undefined}
            onValueChange={(value) => setActiveItem(value)}
          >
            {faqData.map((item: any, index: number) => (
              <AnimatedWrapper key={item.id} custom={index}>
                <CardWrapper className="mb-4 px-4 py-2">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-black font-normal hover:no-underline transition-colors w-full cursor-pointer">
                      <p className="text-right text-sm md:text-base w-full font-semibold">
                        {item.question}
                      </p>
                    </AccordionTrigger>
                    <AccordionContent className="px-3">
                      <div className="prose prose-sm prose-invert max-w-none text-[14px] md:text-base">
                        {typeof item.answer === 'string' ? (
                          item.answer
                        ) : (
                          <ul>
                            {item.answer.map((text: string, index: number) => (
                              <li key={index}>{text}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </CardWrapper>
              </AnimatedWrapper>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </Layer>
  );
};

export default FAQ;
