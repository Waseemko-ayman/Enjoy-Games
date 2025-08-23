import CardWrapper from '@/components/atomic/CardWrapper';
import NavItem from '@/components/atomic/NavItem';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useAuthContext } from '@/context/AuthContext';
import { userList } from '@/data';
import { useTranslations } from 'next-intl';
import React from 'react';

const UserPopup = () => {
  const t = useTranslations();
  const rankT = useTranslations('MyAccount.rank');
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <CardWrapper className="absolute top-[120%] left-0 z-50 bg-white p-2 w-[212px]">
      <ul>
        {userList.map((section, index) => {
          if (section.section === 'rank') {
            return (
              <AnimatedWrapper key={index} custom={index}>
                <div className="border-b border-b-gray-200 px-2 py-3">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h5 className="font-semibold text-sm">
                        {rankT('title')}
                      </h5>
                      <div className="bg-enjoy-primary text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
                        {section.rank?.level}
                      </div>
                    </div>
                    <p className="text-xs text-enjoy-primary font-medium">
                      {rankT('subtitle')}
                    </p>
                  </div>
                </div>
              </AnimatedWrapper>
            );
          }

          return (
            <div
              key={index}
              className="border-b border-b-gray-200 pb-2 last:border-0"
            >
              {section.items?.map((item, index) => {
                const { key, namespace } = getTranslationKey(item.title);
                return (
                  <AnimatedWrapper key={item.id} custom={index}>
                    <li className="w-full">
                      <NavItem
                        icon={item.icon}
                        name={t(`${namespace}.${key}`)}
                        otherClassNameIcon="text-gray-500 text-sm"
                        otherClassName="!px-2 !py-3 !text-sm hover:bg-[#f4f4ff] rounded-lg"
                        {...('link' in item ? { linkPath: item.link } : {})}
                        onClick={
                          item.title === 'تسجيل خروج' ? handleLogout : undefined
                        }
                      />
                    </li>
                  </AnimatedWrapper>
                );
              })}
            </div>
          );
        })}
      </ul>
    </CardWrapper>
  );
};

function getTranslationKey(title: string): {
  key: string;
  namespace: 'PagesHeaderTitles' | 'BtnTexts';
} {
  switch (title) {
    case 'حسابي':
      return { key: 'my-account', namespace: 'PagesHeaderTitles' };
    case 'طلباتي':
      return { key: 'my-purchases', namespace: 'PagesHeaderTitles' };
    case 'تذاكر الدعم الفني':
      return { key: 'tickets', namespace: 'PagesHeaderTitles' };
    case 'ولاء إنجوي':
      return { key: 'stars', namespace: 'PagesHeaderTitles' };
    case 'الإهتمامات':
      return { key: 'interests', namespace: 'PagesHeaderTitles' };
    case 'المحفظة':
      return { key: 'wallet', namespace: 'PagesHeaderTitles' };
    case 'دعواتي':
      return { key: 'referrals', namespace: 'PagesHeaderTitles' };
    case 'لوحة التحكم':
      return { key: 'dashboard', namespace: 'PagesHeaderTitles' };
    case 'تسجيل خروج':
      return { key: 'logout', namespace: 'BtnTexts' };
    default:
      return { key: title, namespace: 'PagesHeaderTitles' };
  }
}

export default UserPopup;
