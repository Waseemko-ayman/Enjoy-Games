import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import Container from '@/components/organism/Container';
import GamepadBackground from '@/components/organism/GamepadBackground';
import { FOOTER_LINKS_DATA } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaMobile } from 'react-icons/fa6';

const MaintenancePage = () => {
  return (
    <div>
      <GamepadBackground />
      <div className="bg-[#f4e3cd] min-h-screen flex items-center justify-center">
        <Container otherClassName="w-full">
          <div className="flex items-center justify-evenly gap-2 flex-col md:flex-row">
            <Image
              src="/assets/maintenance.webp"
              alt="maintenance"
              width={500}
              height={500}
            />
            <div className="text-right">
              <div className="flex items-center gap-5">
                <h1 className="text-5xl font-semibold">المتجر قيد الصيانة</h1>
                <Image
                  src="/assets/logo.png"
                  alt="Enjoy Games Logo"
                  width={100}
                  height={100}
                />
              </div>
              <p>عزيزي العميل المتجر قيد الصيانة</p>
              <div className="border-t border-gray-300 flex items-center justify-end gap-3 mt-4 py-4">
                <div className="flex items-center gap-5">
                  {FOOTER_LINKS_DATA.socialMedia.map((item, index) => (
                    <AnimatedWrapper key={item.id} custom={index}>
                      <Link
                        href={item.url}
                        className="block text-sm cursor-pointer"
                      >
                        <item.icon
                          className="text-enjoy-primary-deep group-hover:text-[var(--enjoy-primary)] transition-all duration-300"
                          size={17}
                        />
                      </Link>
                    </AnimatedWrapper>
                  ))}
                </div>
                <div className="bg-enjoy-primary text-white text-xs py-2 px-4 max-w-2xl rounded-full flex items-center justify-between gap-3">
                  <p>تواصل معنا</p>
                  <FaMobile />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MaintenancePage;
