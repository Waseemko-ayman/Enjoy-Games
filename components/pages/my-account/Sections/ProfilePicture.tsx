'use client';
import Avatar from '@/components/atomic/Avatar';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import useIsMobile from '@/hook/useIsMobile';
import { FormValues, TranslationFunction } from '@/interfaces';
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ProfilePicture = ({ t }: { t: TranslationFunction }) => {
  const isMobile = useIsMobile();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { setValue } = useFormContext<FormValues>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      setAvatarPreview(URL.createObjectURL(files[0]));
      setValue('avatar', files);
    }
  };
  return (
    <div className={`pb-7 ${!isMobile ? 'border-b border-gray-300' : ''}`}>
      <AnimatedWrapper>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full flex items-center justify-center cursor-pointer"
          >
            <Avatar
              imgSrc={avatarPreview || '/assets/user-vector.jpg'}
              imgAlt="Profile"
              otherClassName="w-20 h-20"
              width={20}
              height={20}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </button>
          <div>
            <h3 className="text-lg font-medium mb-2">
              {t('ProfileImage.title')}
            </h3>
            <p className="text-sm text-gray-500">{t('ProfileImage.desc')}</p>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default ProfilePicture;
