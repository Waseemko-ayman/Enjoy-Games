'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaMessage } from 'react-icons/fa6';
import AuthLayout from '@/components/organism/AuthLayout';
import Button from '@/components/atomic/Button';

const OTPPage = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

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
    if (value.length > 1 || (value && !/^\d$/.test(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 4);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 4; i++) {
      newOtp[i] = pastedData[i];
    }

    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 3)]?.focus();
  };

  return (
    <AuthLayout
      title="أنشئ حساب جديد"
      description="وصلتك رسالة واتساب برمز تحقق على الرقم +970592164680"
      btnText="تحقق"
      showFooterText
      isSubmitDisabled={otp.some((digit) => !digit)}
      onSubmit={() => console.log('Submit OTP:', otp.join(''))}
    >
      <div className="flex gap-3 justify-center mb-6">
        {otp.map((digit, index) => (
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
            className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-semibold focus:border-purple-600 focus:outline-none transition-colors"
          />
        ))}
      </div>

      {timeLeft > 0 ? (
        <div className="bg-gray-200 rounded-lg w-fit mx-auto py-2 px-3 text-center text-gray-400 text-sm mb-3">
          إرسال رمز جديد بعد {formatTime(timeLeft)}
        </div>
      ) : (
        <div className="flex items-center justify-between flex-wrap gap-2 mt-4">
          <Button
            variant="fifth"
            type="button"
            Icon={FaMessage}
            otherClassName="text-[11px] py-1 px-6"
          >
            (SMS) رسالة نصيّة
          </Button>
          <h4 className="text-sm font-normal">لم يصلك الرمز؟ أعد إرساله عبر</h4>
        </div>
      )}
    </AuthLayout>
  );
};

export default OTPPage;
