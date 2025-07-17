'use client';

import Avatar from '@/components/atomic/Avatar';
import Button from '@/components/atomic/Button';
import CardWrapper from '@/components/atomic/CardWrapper';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import { InterestsData } from '@/data';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

const InterestsPage = () => {
  const [selected, setSelected] = useState<{ [key: number]: boolean }>({});

  const handleSelect = (id: number) => {
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Layer otherClassName="!my-10">
      <Container>
        <div className="w-full max-w-4xl mx-auto">
          <CardWrapper bgColor="bg-white" className="py-5 px-5 sm:px-10">
            <h2 className="text-base font-semibold mb-7">
              وش أكثر شي تحب تشتريه؟ 🎯
            </h2>

            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
              {InterestsData.map((item) => (
                <div key={item.id} className="relative w-fit mx-auto">
                  <div
                    onClick={() => handleSelect(item.id)}
                    className={`relative flex flex-col justify-center gap-2 cursor-pointer border-2 rounded-full transition-all duration-300 ${
                      selected[item.id]
                        ? 'border-enjoy-primary'
                        : 'border-transparent'
                    }`}
                  >
                    <Avatar
                      imgSrc={item.src}
                      imgAlt={item.alt}
                      imgTitle={item.title}
                      width={75}
                      height={75}
                      otherClassName="mx-auto"
                    />
                  </div>
                  {selected[item.id] && (
                    <span className="absolute bottom-8 left-1 bg-green-600 text-white rounded-full p-1 text-xs">
                      <FaCheck className="w-3 h-3" />
                    </span>
                  )}
                  <h4 className="text-sm text-center font-bold mt-4">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </CardWrapper>
          <Button otherClassName="py-3 px-12 mt-7">حفظ التغييرات</Button>
        </div>
      </Container>
    </Layer>
  );
};

export default InterestsPage;
