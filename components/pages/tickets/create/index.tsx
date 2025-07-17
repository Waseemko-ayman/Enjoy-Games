import Layer from '@/components/atomic/Layer';
import PageHeader from '@/components/molecules/PageHeader';
import Container from '@/components/organism/Container';
import React from 'react';
import Questions from './Sections/Questions';
import CreateForm from './Sections/CreateForm';

const CreatePage = () => {
  return (
    <div>
      <PageHeader />
      <Layer>
        <Container>
          <div className="w-full max-w-4xl mx-auto">
            <Questions />
            <CreateForm />
          </div>
        </Container>
      </Layer>
    </div>
  );
};

export default CreatePage;
