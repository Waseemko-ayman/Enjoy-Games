import React from 'react';
import Container from '../Container';
import Input from '@/components/atomic/Input';
import { IoSearch } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

const SearchHeader = () => {
  const t = useTranslations('Inputs.placeHolders');
  return (
    <div className="py-2 bg-enjoy-glass">
      <Container>
        <form>
          <Input
            type="text"
            inputName="search"
            placeholder={t('writeWhatYouWant')}
            variant="secondary"
            otherClassName="placeholder:text-lg"
            otherClassNameContainer="max-w-[500px] mx-auto"
            iconClassName="text-gray-400"
            Icon={IoSearch}
          />
        </form>
      </Container>
    </div>
  );
};

export default SearchHeader;
