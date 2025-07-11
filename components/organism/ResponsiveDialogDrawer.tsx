'use client';

import React from 'react';
import CustomDrawer from '../molecules/CustomDrawer';
import CustomDialog from '../molecules/CustomDialog';
import { ResponsiveDialogDrawerProps } from '@/interfaces';

const ResponsiveDialogDrawer: React.FC<ResponsiveDialogDrawerProps> = ({
  open,
  setOpen,
  trigger,
  children,
  contentClassName,
  isMobile,
}) => {
  const Component = isMobile ? CustomDrawer : CustomDialog;

  const title = 'إنجوي قيمز من إنجوي قيمز';
  const description =
    'اشتري أكثر واكسب الضعف واستبدل نقاطك ببطاقات! إنجوي قيمز هو نظام ولاء يمنحك نقاطًا عند كل عملية شراء، والتي يمكنك استبدالها ببطاقات رقمية أو تحويلها إلى رصيد في محفظتك.';

  return (
    <Component
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      title={title}
      description={description}
      contentClassName={contentClassName}
      headerClassName="p-0"
    >
      {children}
    </Component>
  );
};

export default ResponsiveDialogDrawer;
