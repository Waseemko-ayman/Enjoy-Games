'use client';

import React, { useRef, useState } from 'react';
import { FaLink, FaX } from 'react-icons/fa6';
import Button from '@/components/atomic/Button';
import Input from '@/components/atomic/Input';
import CardWrapper from '@/components/atomic/CardWrapper';
import { ticketsInputsTypes } from '@/data';
import Image from 'next/image';

const CreateForm = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachments((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CardWrapper className="p-6 mt-7">
      <form>
        <div className="space-y-7">
          {ticketsInputsTypes.map((input) => (
            <Input
              key={input.id}
              variant="secondary"
              type={input.type || 'text'}
              placeholder={input.placeholder}
              options={input.options}
            />
          ))}
        </div>

        {/* File Upload Trigger */}
        <div
          className="font-semibold text-base cursor-pointer flex items-center gap-2 mt-5 hover:text-enjoy-primary transition-colors duration-300"
          onClick={() => fileInputRef.current?.click()}
        >
          <FaLink />
          <h3>أضف مرفقات للتذكرة (غير إلزامي)</h3>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Preview Attachments */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {attachments.map((file, index) => (
              <div key={index} className="relative overflow-hidden group">
                {file.type.startsWith('image') ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="attachment"
                    width={80}
                    height={80}
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
                  otherClassName="absolute top-0 right-0 text-white w-6 h-6 flex items-center justify-center hover:!bg-red-500"
                >
                  <FaX />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button otherClassName="w-full py-3 px-3 mt-7">إرسال التذكرة</Button>
      </form>
    </CardWrapper>
  );
};

export default CreateForm;
