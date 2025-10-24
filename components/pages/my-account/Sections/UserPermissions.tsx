import { permissionsOptions } from '@/utils/constant';
import { CheckCircle, ShieldOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const UserPermissions = ({ permissions }: { permissions: string[] }) => {
  const t = useTranslations('Dashboard.Users');

  const getTranslatedName = (perm: string) => {
    const found = permissionsOptions.find((opt) => opt.id === perm);
    return found ? t(`permissions.${found.name}`) : perm;
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-medium text-gray-500 mb-4">
        {t('userPermissions')}
      </h2>
      {permissions?.length > 0 ? (
        <ul className="flex items-center flex-wrap gap-2">
          {permissions.map((perm: string, i: number) => (
            <li
              key={i}
              className="flex items-center gap-2 bg-[var(--enjoy-gray-200)] px-3 py-2 rounded-xl text-sm text-gray-700 w-fit cursor-default hover:bg-enjoy-primary hover:!text-white transition-all duration-200 group"
            >
              <CheckCircle
                size={14}
                className="text-enjoy-primary group-hover:!text-white transition-all duration-200"
              />
              <span>{getTranslatedName(perm)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <ShieldOff size={16} className="text-enjoy-primary" />
          {t('noPermissions')}
        </p>
      )}
    </div>
  );
};

export default UserPermissions;
