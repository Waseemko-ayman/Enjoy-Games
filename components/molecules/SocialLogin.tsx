import React from 'react';
import Image from 'next/image';
import Button from '@/components/atomic/Button';

interface SocialLoginProps {
  btnTxts: (key: string) => string;
  authTxts: (key: string) => string;
  onGoogleClick?: () => void;
  onFacebookClick?: () => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({
  btnTxts,
  authTxts,
  onGoogleClick,
  onFacebookClick,
}) => {
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
        <Button
          type="button"
          variant="ghost"
          otherClassName="border border-gray-300 py-2 text-sm text-enjoy-primary-deep !font-normal hover:!bg-[#f4f4ff]"
          handleClick={onGoogleClick}
        >
          <Image src="/assets/google.png" alt="Google" width={25} height={25} />
          {btnTxts('continueWithGoogle')}
        </Button>

        <Button
          type="button"
          variant="ghost"
          otherClassName="border border-gray-300 py-2 text-sm text-enjoy-primary-deep !font-normal hover:!bg-[#f4f4ff]"
          handleClick={onFacebookClick}
        >
          <Image
            src="/assets/facebook.png"
            alt="Facebook"
            width={25}
            height={25}
          />
          {btnTxts('continueWithFacebook')}
        </Button>
      </div>
    </>
  );
};

export default SocialLogin;
