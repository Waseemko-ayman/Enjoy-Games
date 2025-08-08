import React, { useState } from 'react';
import Container from '../Container';
import Input from '@/components/atomic/Input';
import { IoSearch } from 'react-icons/io5';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const SearchHeader = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Translations
  const t = useTranslations('Inputs.placeHolders');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <div className="py-2 bg-enjoy-glass">
      <Container>
        <form onSubmit={handleSearch}>
          <Input
            type="text"
            inputName="search"
            placeholder={t('writeWhatYouWant')}
            variant="secondary"
            otherClassName="placeholder:text-lg"
            otherClassNameContainer="max-w-[500px] mx-auto"
            iconClassName="text-gray-400"
            Icon={IoSearch}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </Container>
    </div>
  );
};

export default SearchHeader;
