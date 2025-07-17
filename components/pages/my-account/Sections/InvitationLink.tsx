'use client';

import { ExternalLink } from 'lucide-react';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

const InvitationLink = () => {
  const [copied, setCopied] = useState(false);
  const link = 'https://daleelstore.com/r/871249';

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="border-b border-gray-300 pb-7">
      <div className="flex items-center gap-2 mb-3 cursor-pointer">
        <ExternalLink className="w-4 h-4 text-gray-400" />
        <span>نسخ رابط الدعوة</span>
      </div>
      <div
        className="flex items-center justify-center gap-2 bg-enjoy-gray-light rounded-full py-2 px-3 text-center cursor-pointer"
        onClick={handleCopy}
      >
        <span className="text-enjoy-primary text-sm break-all font-bold">
          {link}
        </span>
        {copied && <FaCheck className="w-5 h-5 text-enjoy-primary font-bold" />}
      </div>
    </div>
  );
};

export default InvitationLink;
