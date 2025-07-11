import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { CustomDialogDrawerProps } from '@/interfaces';

const CustomDialog: React.FC<CustomDialogDrawerProps> = ({
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={contentClassName}>
        {(title || description) && (
          <DialogHeader className={headerClassName}>
            {title && <DialogTitle className="sr-only">{title}</DialogTitle>}
            {description && (
              <DialogDescription className="sr-only">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
