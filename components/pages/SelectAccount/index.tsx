'use client';

import Container from '@/components/organism/Container';
import GridWrapper from '@/components/molecules/GridWrapper';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useParams, useRouter } from 'next/navigation';
import CategoryCard from '@/components/molecules/CategoryCard';
import { SelectAccountPageProps } from '@/interfaces';

export default function SelectAccountPage({
  accounts,
}: SelectAccountPageProps) {
  const router = useRouter();
  const params = useParams();

  const handleSelect = (accountId: string) => {
    if (!params?.category || !params?.itemId) {
      console.error('Category or itemId is missing in params');
      return;
    }
    router.push(
      `/categories/${params.category}/${params.itemId}/bundles?account=${accountId}`
    );
  };

  if (!accounts || accounts.length === 0) {
    return <div>لا توجد حسابات للاختيار.</div>;
  }

  return (
    <Container>
      <GridWrapper otherClassName="gap-8 mt-12">
        {accounts.map((account, index) => (
          <AnimatedWrapper key={account.id} custom={index}>
            <CategoryCard
              image={'/assets/play-station.webp'}
              name={account.name}
              onClick={() => handleSelect(account.id)}
            />
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </Container>
  );
}
