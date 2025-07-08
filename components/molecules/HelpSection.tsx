import React from 'react';
import ContactInfo from './ContactInfo';
import { MdEmail } from 'react-icons/md';
import { IoMdHelpCircle } from 'react-icons/io';

const contactData = [
  {
    id: 1,
    label: 'البريد الإلكتروني',
    email: 'mailto:contact@enjoygames.com',
    icon: MdEmail,
  },
  {
    id: 2,
    label: 'مركز المساعدة',
    email: 'help.enjoygames.com',
    icon: IoMdHelpCircle,
  },
];

const HelpSection = () => {
  return (
    <section className="bg-white p-6 max-[425px]:px-3 rounded-2xl shadow-[0_4px_20.3px_13px_rgba(0,0,0,0.06)] flex items-center justify-center max-[991px]:flex-col gap-24 max-[991px]:gap-5 overflow-hidden">
      <h3 className="text-xl font-bold">هل تحتاج مساعدة؟</h3>
      <div className="flex items-center justify-center gap-20 max-md:flex-col max-md:w-full max-md:gap-6 max-md:items-start">
        {contactData.map((item) => (
          <ContactInfo
            key={item.id}
            label={item.label}
            email={item.email}
            Icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default HelpSection;
