import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { CustomDialogDrawerProps } from '@/interfaces';

const CustomDrawer: React.FC<CustomDialogDrawerProps> = ({
  open,
  setOpen,
  trigger,
  title,
  description,
  children,
  contentClassName,
  headerClassName,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className={contentClassName}>
        {(title || description) && (
          <DrawerHeader className={headerClassName}>
            {title && <DrawerTitle className="sr-only">{title}</DrawerTitle>}
            {description && (
              <DrawerDescription className="sr-only">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>
        )}
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
