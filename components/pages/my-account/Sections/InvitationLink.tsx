'use client';

import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useReferralCode } from '@/hook/ReferralCodeContext';
import { TranslationFunction } from '@/interfaces';
import { ExternalLink } from 'lucide-react';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

const InvitationLink = ({ t }: { t: TranslationFunction }) => {
  const [copied, setCopied] = useState(false);

  // Context hook
  const { referralCode } = useReferralCode();

  const link = `/auth/signup?referral_code=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="border-b border-gray-300 pb-7" onClick={handleCopy}>
      <AnimatedWrapper>
        <div className="flex items-center gap-2 mb-3 cursor-pointer">
          <ExternalLink className="w-4 h-4 text-gray-400" />
          <span>{t('CopyLink')}</span>
          {copied && (
            <FaCheck className="w-5 h-5 text-enjoy-primary font-bold" />
          )}
        </div>
        <div className="flex items-center justify-center gap-2 bg-enjoy-gray-light rounded-full py-2 px-3 text-center cursor-pointer">
          <span className="text-enjoy-primary text-sm break-all font-bold">
            {link}
          </span>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default InvitationLink;
