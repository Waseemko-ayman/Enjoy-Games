'use client';
import React from 'react';

const PageTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className='mb-6'>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default PageTitle;
