'use client';
import Avatar from '@/components/atomic/Avatar';
import useIsMobile from '@/hook/useIsMobile';
import React, { useRef, useState } from 'react';

const ProfilePicture = () => {
  const isMobile = useIsMobile();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.files) {
      setAvatarPreview(URL.createObjectURL(file));
      // setValue('avatar', e.target.files); // Update the value in the model
    }
  };
  return (
    <div
      className={`flex gap-4 pb-7 ${
        !isMobile ? 'border-b border-gray-300' : ''
      }`}
    >
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
        <h3 className="text-lg font-medium mb-2">الصورة الشخصية</h3>
        <p className="text-sm text-gray-500">
          انقر على الصورة لإضافتها أو تغييرها
        </p>
      </div>
    </div>
  );
};

export default ProfilePicture;
