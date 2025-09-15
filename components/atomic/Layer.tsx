import React from 'react';

const Layer = ({
  children,
  otherClassName,
  ...props
}: React.PropsWithChildren<
  {
    children: React.ReactNode;
    otherClassName?: string;
  } & React.HTMLAttributes<HTMLElement>
>) => {
  return (
    <section
      className={`relative my-10 sm:!my-20 ${
        otherClassName ? otherClassName : ''
      }`}
      {...props}
    >
      {children}
    </section>
  );
};

export default Layer;
