// AttachmentsUploader.tsx
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/atomic/Button';
import { FaX, FaLink } from 'react-icons/fa6';
import { FiUploadCloud } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { useToggleLocale } from '@/hook/useToggleLocale';

type AttachmentsUploaderProps = {
  attachments: File[];
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
  variant?: 'ticket' | 'rating';
};

const AttachmentsUploader = ({
  attachments,
  setAttachments,
  variant = 'rating',
}: AttachmentsUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('Tickets');
  const { isArabic } = useToggleLocale();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachments((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const renderUploadTrigger = () => {
    if (variant === 'ticket') {
      return (
        <div
          className="font-semibold text-base cursor-pointer flex items-center gap-2 mt-5 hover:text-enjoy-primary transition-colors duration-300"
          onClick={() => fileInputRef.current?.click()}
        >
          <FaLink />
          <h3>{t('addAttachments')}</h3>
        </div>
      );
    }
    // variant === 'rating'
    return (
      <div
        className="w-full max-w-md mx-auto bg-[#f7f9fa] rounded-xl border border-gray-200 p-6 text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <FiUploadCloud className="mx-auto text-4xl text-black mb-4" />
        <p
          className={`${
            isArabic ? 'text-base' : 'text-sm'
          } font-bold text-black select-none`}
        >
          {t('attachmentsDescription')}
        </p>
      </div>
    );
  };

  return (
    <>
      {renderUploadTrigger()}

      <input
        type="file"
        ref={fileInputRef}
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {attachments.map((file, index) => (
            <div key={index} className="relative overflow-hidden group">
              {file.type.startsWith('image') ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="attachment"
                  width={variant === 'ticket' ? 80 : 60}
                  height={variant === 'ticket' ? 80 : 60}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-center p-2 bg-gray-100">
                  {file.name}
                </div>
              )}
              <Button
                type="button"
                variant="circle"
                handleClick={() => removeAttachment(index)}
                bgColor="bg-red-500"
                otherClassName="absolute top-0 right-0 text-white w-5 h-5 flex items-center justify-center hover:!bg-red-500"
              >
                <FaX />
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AttachmentsUploader;
