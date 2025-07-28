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

type FAQItem = {
  id: string | number;
  question: string;
  answer: string | string[];
};

type FAQComProps = {
  title: string;
  faqData: FAQItem[];
};

const FAQCom: React.FC<FAQComProps> = ({ title, faqData }) => {
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);

  return (
    <Layer>
      <Container>
        <SectionTitle
          title={title}
          className="!mb-3"
          titleClassName="!text-2xl !text-start"
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
            value={activeItem}
            onValueChange={setActiveItem}
          >
            {faqData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
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
                            {item.answer.map((text, idx) => (
                              <li key={idx}>{text}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </CardWrapper>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </Layer>
  );
};

export default FAQCom;
