'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/utils/constant';
import useIsMobile from '@/hook/useIsMobile';
import Image from 'next/image';
import { PATHS } from '@/data/paths';
import { useTranslations } from 'next-intl';
import { useToggleLocale } from '@/hook/useToggleLocale';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import InlineError from '@/components/molecules/InlineError';
import Avatar from '@/components/atomic/Avatar';
import { useUserInfo } from '@/context/UserInfoContext';
import { API_IMAGE_URL } from '@/config/api';
import { useAuthContext } from '@/context/AuthContext';

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
  const isMobile = useIsMobile(991);
  const { isArabic } = useToggleLocale();
  const { user, isLoading, error } = useUserInfo();
  const { user: userInfo } = useAuthContext();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const permissions = userInfo?.permissions || [];

  // Permissions required for each link
  const linkPermissionMap: Record<string, string> = {
    categories: 'manage categories',
    subCategories: 'manage subcategories',
    products: 'manage products',
    coupons: 'manage coupons',
    codes: 'manage codes',
    sliders: 'manage sliders',
    ratings: 'manage ratings',
    orders: 'manage orders',
    users: 'manage users',
    settings: 'manage settings',
    tickets: 'reply tickets',
  };

  // Full permissions = user admin
  const allPermissions = Object.values(linkPermissionMap);
  const isAdmin =
    permissions.length &&
    allPermissions.every((perm) => permissions.includes(perm));

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-center border-b border-b-gray-300 px-4">
        <Link
          href={PATHS.HOME.link}
          className="flex items-center gap-2 font-semibold"
        >
          <Image
            src="/assets/logo.png"
            alt="Enjoy Games Logo"
            width={90}
            height={90}
          />
        </Link>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <div className="flex flex-col items-start gap-4">
          <nav className="grid items-start text-sm font-medium w-full">
            {sidebarLinks
              .filter((link) => {
                const alwaysVisible = ['enjoyGames'];
                if (alwaysVisible.includes(link.title)) return true;

                if (
                  link.title === 'dashboard' &&
                  permissions.includes('manage orders')
                )
                  return true;

                if (link.title === 'productSubscribers') {
                  return permissions.includes('manage users');
                }

                if (isAdmin) return true;

                const requiredPermission = linkPermissionMap[link.title];
                return requiredPermission
                  ? permissions.includes(requiredPermission)
                  : false;
              })
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-black hover:bg-muted',
                    pathname === link.href && 'bg-muted text-black'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {t(`sidebar.${link.title}`)}
                </Link>
              ))}
          </nav>
        </div>
      </div>

      <div className="mt-auto border-t border-t-gray-300 p-3">
        <div className="flex items-center gap-2 rounded-lg border border-gray-300 p-4">
          {isLoading ? (
            <ButtonLoading borderColor="text-black" />
          ) : error ? (
            <InlineError textColor="text-black" />
          ) : (
            <Avatar
              imgSrc={
                `${API_IMAGE_URL}${user?.photo}` || '/assets/user-avatar.png'
              }
              imgAlt="character"
              width={30}
              height={30}
            />
          )}
          <div>
            <p className="text-sm font-medium">
              {isLoading ? t('Loading.loadingMessage') : user?.name}
            </p>
            <p className="text-xs">
              {isLoading
                ? t('Loading.loadingMessage')
                : userInfo?.is_admin
                ? t('Dashboard.roles.admin')
                : t('Dashboard.roles.user')}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {isMobile && (
        <div className={`fixed ${isArabic ? 'left-4' : 'right-4'} top-4 z-40`}>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0 w-64 bg-white">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      )}

      {!isMobile && (
        <div className="hidden lg:flex h-screen w-64 flex-col justify-between border border-gray-300 bg-white rounded-br-lg">
          <SidebarContent />
        </div>
      )}
    </>
  );
}
