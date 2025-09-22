/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/atomic/Button';
import useAPI from '@/hook/useAPI';

interface SocialLoginProps {
  btnTxts: (key: string) => string;
  authTxts: (key: string) => string;
  onClick?: (provider: string) => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({
  btnTxts,
  authTxts,
  onClick,
}) => {
  const { get, data: social } = useAPI('social/providers');

  const providerImages: Record<string, string> = {
    google: '/assets/google.png',
    facebook: '/assets/facebook.png',
    apple: '/assets/apple.png',
  };

  useEffect(() => {
    get();
  }, [get]);

  return (
    <>
      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="mx-4 text-sm text-gray-500">
          {authTxts('orLoginWith')}
        </span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      {/* Social Buttons */}
      <div className="flex flex-col gap-3 max-sm:gap-2">
        {social?.map((provider: any) => (
          <Button
            key={provider.value}
            type="button"
            variant="ghost"
            otherClassName="border border-gray-300 py-2 text-sm text-enjoy-primary-deep !font-normal hover:!bg-[#f4f4ff]"
            handleClick={() => onClick?.(provider.value)}
          >
            <Image
              src={providerImages[provider.value]}
              alt={provider.label}
              width={25}
              height={25}
            />
            {(btnTxts as any)('continueWith', { name: provider.label })}
          </Button>
        ))}
      </div>
    </>
  );
};

export default SocialLogin;
