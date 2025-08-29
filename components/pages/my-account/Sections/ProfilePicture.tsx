'use client';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { API_IMAGE_URL } from '@/config/api';
import useIsMobile from '@/hook/useIsMobile';
import { FormValues, TranslationFunction } from '@/interfaces';
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfilePicture = ({
  t,
  photo,
}: {
  t: TranslationFunction;
  photo: FileList | string | null;
}) => {
  const isMobile = useIsMobile();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { setValue } = useFormContext<FormValues>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      setAvatarPreview(URL.createObjectURL(files[0]));
      setValue('photo', files);
    }
  };

  const getPhotoSrc = () => {
    if (avatarPreview) return avatarPreview; // صورة جديدة مختارة
    if (photo && typeof photo === 'string') return `${API_IMAGE_URL}${photo}`; // رابط موجود
    return '/assets/user-vector.jpg'; // افتراضي
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
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={getPhotoSrc()}
                alt="Profile"
                className="shadow-lg"
              />
              <AvatarFallback>A.I.</AvatarFallback>
            </Avatar>
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
