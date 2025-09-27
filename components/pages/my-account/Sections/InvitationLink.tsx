'use client';

import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useReferralCode } from '@/hook/ReferralCodeContext';
import { TranslationFunction } from '@/interfaces';
import { useToast } from '@/lib/toast';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

const InvitationLink = ({
  t,
  userReferralCode,
}: {
  t: TranslationFunction;
  userReferralCode: string;
}) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  const msgsT = useTranslations('Messages');

  const domain = window.location.origin;

  // Context hook
  const { referralCode } = useReferralCode();

  const link = `${domain}/auth/signup?referral_code=${
    referralCode || userReferralCode
  }`;

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      showToast(msgsT('linkCopied'));
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="pb-7" onClick={handleCopy}>
      <AnimatedWrapper>
        <div className="flex items-center gap-2 mb-3 cursor-pointer">
          <ExternalLink className="w-4 h-4 text-gray-400" />
          <span>{t('CopyLink')}</span>
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                <FaCheck className="w-5 h-5 text-[var(--enjoy-success)] font-bold" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center gap-2 bg-enjoy-gray-light rounded-full py-2 px-3 text-center cursor-pointer">
          <span
            className="text-enjoy-primary text-sm break-all font-bold truncate max-w-[270px]"
            dir="ltr"
            title={link}
          >
            {link}
          </span>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default InvitationLink;
