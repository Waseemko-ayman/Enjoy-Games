'use client';

import React, { useEffect, useRef } from 'react';
import AuthLayout from '@/components/organism/AuthLayout';
import Button from '@/components/atomic/Button';
import { useTranslations } from 'next-intl';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { useAuthContext } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PATHS } from '@/data/paths';
import { useRouter } from 'next/navigation';

const otpSchema = yup.object({
  otp: yup.string().required(),
});

type OtpFormData = yup.InferType<typeof otpSchema>;

const OTPPage = () => {
  const [timeLeft, setTimeLeft] = React.useState(300);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const authTxts = useTranslations('Auth');
  const btnTxts = useTranslations('BtnTexts');
  const { verifyOtp, isLoading, login, token } = useAuthContext();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<OtpFormData>({
    resolver: yupResolver(otpSchema),
    mode: 'onChange',
  });

  const otpValue = watch('otp', '');
  const otpArray = otpValue.split('').concat(Array(6).fill('')).slice(0, 6);

  // 3. تسجيل الحقول بشكل يدوي
  useEffect(() => {
    register('otp');
  }, [register]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = otpValue.split('');
    newOtp[index] = value;
    const joinedOtp = newOtp.slice(0, 6).join('');

    setValue('otp', joinedOtp, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    if (value && index < 5) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    setValue('otp', pastedData, {
      shouldValidate: true,
    });
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const isInputEnabled = (index: number) => {
    return index === 0 || otpArray[index - 1] !== '';
  };

  const onSubmit = async (data: OtpFormData) => {
    try {
      const email = sessionStorage.getItem('otp_email');
      if (!email) {
        throw new Error(authTxts('emailNotFound'));
      }
      await verifyOtp(email, data.otp);
    } catch (error) {
      console.error(`${authTxts('verificationFailedCode')}:`, error);
    }
  };

  const handleResendCode = () => {
    const email = sessionStorage.getItem('otp_email') || '';
    const password = sessionStorage.getItem('otp_password') || '';

    if (!email || !password) return;

    login({ email, password });
    setTimeLeft(300);
  };

  useEffect(() => {
    const otpEmail = sessionStorage.getItem('otp_email');

    if (token) {
      router.replace(PATHS.HOME.link);
    } else if (!otpEmail) {
      router.replace(PATHS.LOGIN);
    }
  }, [token, router]);

  return (
    <AuthLayout
      title={authTxts('signupDesc')}
      description={authTxts('otpDesc')}
      btnText={btnTxts('check')}
      isSubmitDisabled={!isValid || otpValue.length < 6}
      isSubmitting={isLoading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-3 justify-center mb-6" dir="ltr">
        {otpArray.map((digit, index) => (
          <input
            key={index}
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={!isInputEnabled(index)}
            className={`w-12 h-12 border-2 rounded-lg text-center text-lg font-semibold focus:outline-none transition-colors ${
              !isInputEnabled(index)
                ? 'border-gray-200 bg-gray-100 text-gray-400'
                : 'border-gray-300 focus:border-purple-600'
            }`}
          />
        ))}
      </div>

      {timeLeft > 0 ? (
        <div className="bg-gray-200 rounded-lg w-fit mx-auto py-2 px-3 text-center text-gray-400 text-sm mb-3">
          {authTxts('sendNewCode')} {formatTime(timeLeft)}
        </div>
      ) : (
        <div className="flex items-center justify-between flex-wrap gap-2 mt-4">
          <h4 className="text-sm font-normal">{authTxts('notGetCode')}</h4>
          <Button
            type="button"
            Icon={MdOutlineAlternateEmail}
            otherClassName="text-[11px] py-1 px-6"
            handleClick={handleResendCode}
          >
            {btnTxts('sendEmail')}
          </Button>
        </div>
      )}
    </AuthLayout>
  );
};

export default OTPPage;
