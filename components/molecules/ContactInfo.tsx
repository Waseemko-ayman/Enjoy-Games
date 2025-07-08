import React from 'react';
import Link from 'next/link';

interface ContactInfoProps {
  label: string;
  email: string;
  Icon: React.ElementType;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ label, email, Icon }) => {
  return (
    <Link href={email} className="flex items-center gap-4 group">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <span className="absolute w-11 h-11 rounded-full bg-gray-300 opacity-25"></span>
        <span className="absolute w-8 h-8 rounded-full bg-gray-300 opacity-45"></span>
        <Icon className="text-gray-900 text-xl relative z-10 group-hover:-rotate-[20deg] transition-all duration-400" />
      </div>
      <div>
        <h5 className="text-base text-[var(--enjoy-gray-675)] font-bold">
          {label}
        </h5>
        <p className="text-[15px] font-bold">{email}</p>
      </div>
    </Link>
  );
};

export default ContactInfo;
