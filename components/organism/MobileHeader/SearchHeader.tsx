import React from 'react';
import Container from '../Container';
import Input from '@/components/atomic/Input';
import { IoSearch } from 'react-icons/io5';

const SearchHeader = () => {
  return (
    <div className="py-2 bg-daleel-glass">
      <Container>
        <form>
          <Input
            type="text"
            inputName="search"
            placeholder="اكتب اللي تبغاه، وخلّنا نلقاه لك"
            variant="secondary"
            otherClassName="placeholder:text-lg"
            otherClassNameContainer="max-w-[500px] mx-auto"
            Icon={IoSearch}
          />
        </form>
      </Container>
    </div>
  );
};

export default SearchHeader;
