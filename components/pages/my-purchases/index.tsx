import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import PageHeader from '@/components/molecules/PageHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PATHS } from '@/data/paths';
import React from 'react';

const MyPurchasesTypes = [
  {
    id: 1,
    label: 'الكل',
  },
  {
    id: 2,
    label: 'المكتملة',
  },
  {
    id: 3,
    label: 'قيد التجهيز والمراجعة',
  },
  {
    id: 4,
    label: 'الملغية والمسترجعة',
  },
];

const MyPurchasesPage = () => {
  return (
    <div>
      <PageHeader>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="الكل" />
          </SelectTrigger>
          <SelectContent>
            {MyPurchasesTypes.map((item, index) => (
              <AnimatedWrapper key={item.id} custom={index}>
                <SelectItem
                  value={item.label}
                  className="hover:bg-[#f4f4ff] hover:text-enjoy-primary"
                >
                  {item.label}
                </SelectItem>
              </AnimatedWrapper>
            ))}
          </SelectContent>
        </Select>
      </PageHeader>
      <EmptyStateBox
        imageSrc="/assets/empty-status.png"
        alt="empty-status"
        title="طلباتك تقول لك: وينك؟ يلا تسوق!"
        buttonText="ابدأ بالتسوق الأن"
        btnlink={PATHS.STORE.link}
      />
    </div>
  );
};

export default MyPurchasesPage;
