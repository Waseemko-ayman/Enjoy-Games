/* eslint-disable @typescript-eslint/no-explicit-any */
import CardWrapper from '@/components/atomic/CardWrapper';
import NavItem from '@/components/atomic/NavItem';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useAuthContext } from '@/context/AuthContext';
import { useUserInfo } from '@/context/UserInfoContext';
import { userList } from '@/data';
import useAPI from '@/hook/useAPI';
import { useToast } from '@/lib/toast';
import { useTranslations } from 'next-intl';
import React from 'react';

const UserPopup = () => {
  // Translations
  const t = useTranslations();
  const rankT = useTranslations('MyAccount.rank');

  // Notifications
  const { showToast } = useToast();

  // Context
  const { token, logout } = useAuthContext();
  const { user } = useUserInfo();

  // Hook for API
  const { add: clearSessionAPI } = useAPI<any, any>('session-timeout/clear');

  const handleLogout = async () => {
    logout();
    try {
      const res = await clearSessionAPI({});
      showToast(
        res?.data?.message ||
          t('Dashboard.settings.sissionTimeout.SessionSuccessfullyCleared')
      );
    } catch (err: any) {
      showToast(
        err?.response?.data?.message ||
          t('Dashboard.settings.sissionTimeout.SessionFaildCleared'),
        'error'
      );
    }
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
                      {/* <div className="bg-enjoy-primary text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
                        {section.rank?.level}
                      </div> */}
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
              className="border-b border-b-gray-200 py-2 last:border-0"
            >
              {section.items
                .filter((item) => {
                  if (item.title === 'حسابي' && !token) return false;
                  if (
                    item.title === 'لوحة التحكم' &&
                    (!user?.permissions || user?.permissions?.length === 0) &&
                    !user?.roles?.includes('admin')
                  ) {
                    return false;
                  }
                  return true;
                })
                .map((item, index) => {
                  const { key, namespace } = getTranslationKey(item.title);
                  return (
                    <AnimatedWrapper key={item.id} custom={index}>
                      <li className="w-full">
                        <NavItem
                          icon={item.icon}
                          name={t(`${namespace}.${key}`)}
                          otherClassNameIcon={`text-sm ${
                            item.title === 'تسجيل خروج'
                              ? '!text-red-500'
                              : 'text-gray-500'
                          }`}
                          otherClassName={`!px-2 !py-3 !text-sm hover:bg-[#f4f4ff] rounded-lg ${
                            item.title === 'تسجيل خروج' ? '!text-red-500' : ''
                          }`}
                          linkPath={
                            'link' in item ? (item.link as string) : undefined
                          }
                          onClick={
                            item.title === 'تسجيل خروج'
                              ? handleLogout
                              : undefined
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
