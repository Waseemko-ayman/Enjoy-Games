import { PATHS } from '@/data/paths';
import { myAccountStatsProps } from '@/interfaces';
import { Wallet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaHeart, FaStar } from 'react-icons/fa6';

const stats = [
  {
    id: 1,
    icon: Wallet,
    title: 'رصيدي',
    currency: '/assets/saudi_riyal.png',
    account: 0,
  },
  {
    id: 2,
    icon: FaStar,
    title: 'لديك حاليا',
    account: 0,
  },
  {
    id: 3,
    icon: FaHeart,
    title: 'الإهتمامات',
    href: PATHS.INTERESTS.link,
  },
];

const Stats = () => {
  const contents = (item: myAccountStatsProps) => {
    const Icon = item.icon;
    return (
      <>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-gray-500" size={12} />}
          <h4 className="text-base">{item.title}</h4>
        </div>
        {item.account !== undefined && (
          <div className="flex items-center justify-center gap-2 bg-[var(--enjoy-gray-200)] p-2 rounded-full">
            <span className="text-enjoy-primary text-xs font-bold">{item.account}</span>
            {item.currency && (
              <Image src={item.currency} alt="ريال" width={12} height={12} />
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <ul className="border-b border-gray-300 pb-7 space-y-2">
      {stats.map((item) => (
        <li key={item.id} className="w-full flex items-center justify-between">
          {item.href ? (
            <Link href={item.href}>{contents(item)}</Link>
          ) : (
            contents(item)
          )}
        </li>
      ))}
    </ul>
  );
};

export default Stats;
