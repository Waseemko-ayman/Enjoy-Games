import React from 'react';

const Container = ({
  children,
  otherClassName,
}: {
  children: React.ReactNode;
  otherClassName?: string;
}) => {
  return (
    <div
      className={`relative px-4 mx-auto sm:max-w-[720px] md:max-w-[920px] lg:max-w-[1120px] ${otherClassName}`}
    >
      {children}
    </div>
  );
};

export default Container;
