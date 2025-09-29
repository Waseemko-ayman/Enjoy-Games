/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/atomic/Button';
import useAPI from '@/hook/useAPI';
import { useToast } from '@/lib/toast';
import Loading from './loading';
import ErrorFetching from './ErrorFetching';

interface SocialLoginProps {
  btnTxts: (key: string) => string;
  authTxts: (key: string) => string;
}

const providerImages: Record<string, string> = {
  google: '/assets/google.png',
  facebook: '/assets/facebook.png',
  apple: '/assets/apple.png',
};

const SocialLogin: React.FC<SocialLoginProps> = ({ btnTxts, authTxts }) => {
  // Toast notifications
  const { showToast } = useToast();

  const {
    get: getProviders,
    data: social,
    isLoading,
    error,
  } = useAPI<any, any>('social/providers');
  const { get: redirect } = useAPI<any, any>('social/redirect');
  const { get: callback } = useAPI<any, any>('social/callback');
  const { add } = useAPI<any, any>('social/login');

  const handleSocialClick = async (provider: any) => {
    try {
      const res = await redirect(provider);
      if (res?.data?.url) {
        window.open(
          res.data.url,
          '_blank',
          'width=500,height=700,top=40,left=400'
        );
      }
    } catch (err) {
      const apiError = (err as any)?.response?.data?.message;
      showToast(apiError, 'error');
    }
  };

  useEffect(() => {
    getProviders();
  }, [getProviders]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const provider = url.searchParams.get('provider');
    const code = url.searchParams.get('code');

    if (provider && code) {
      callback(provider)
        .then(async (res) => {
          const accessToken = res?.data?.access_token;
          if (!accessToken) return;

          const loginBody = {
            provider,
            access_token: accessToken,
            device_type: 'web',
            device_id: navigator.userAgent, // Or any ID you generate for the server
          };
          const loginRes = await add(loginBody);
          if (loginRes.data?.token) {
            localStorage.setItem('token', loginRes.data.token);
            console.log('Login success:', loginRes.data);
          }
        })
        .catch((err) => console.error('Callback error:', err));
    }
  }, [callback]);

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
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorFetching />
        ) : (
          social?.map((provider: any) => (
            <Button
              key={provider.value}
              type="button"
              variant="ghost"
              otherClassName="border border-gray-300 py-2 text-sm text-enjoy-primary-deep !font-normal hover:!bg-[#f4f4ff]"
              handleClick={() => handleSocialClick?.(provider.value)}
            >
              <Image
                src={providerImages[provider.value] || '/assets/google.png'}
                alt={provider.label}
                width={25}
                height={25}
              />
              {(btnTxts as any)('continueWith', { name: provider.label })}
            </Button>
          ))
        )}
      </div>
    </>
  );
};

export default SocialLogin;
