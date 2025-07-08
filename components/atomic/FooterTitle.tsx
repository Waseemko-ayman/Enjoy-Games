import React from 'react';

const FooterTitle = ({ title }: { title: string }) => {
  return (
    <h4 className="text-xl mb-5 font-semibold text-[var(--enjoy-glass)]">
      {title}
    </h4>
  );
};

export default FooterTitle;
