'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/utils/constant';
import useIsMobile from '@/hook/useIsMobile';
import Image from 'next/image';
import { PATHS } from '@/data/paths';
import { useAuthContext } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import { useToggleLocale } from '@/hook/useToggleLocale';

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Translations
  const t = useTranslations();

  // Pathname
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';

  // Hooks
  const isMobile = useIsMobile();
  const { isArabic } = useToggleLocale();

  // Auth
  const { user } = useAuthContext();

  // Close the mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // useEffect(() => {
  //   if (isAuth) {
  //     getProfileData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuth]);

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-center border-b border-b-gray-300 px-4 pb-4">
        <Link
          href={PATHS.HOME.link}
          className="flex items-center gap-2 font-semibold"
        >
          <Image
            src="/assets/logo.png"
            alt="Enjoy Games Logo"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="flex-1 justify-between overflow-auto p-2">
        <div className="flex flex-col items-start justify-between gap-4 h-full">
          <nav className="grid items-start text-sm font-medium w-full">
            {sidebarLinks.map((link) => (
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
      <div className="mt-auto border-t border-t-gray-300 p-4">
        <div className="flex items-center gap-2 rounded-lg border border-gray-300 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            {/* <p className="text-xs text-muted-foreground">{user?.role}</p> */}
            <p className="text-xs text-muted-foreground">user?.role</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <div className={`fixed ${isArabic ? 'left-4' : 'right-4'} top-4 z-40`}>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
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

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:flex h-screen w-64 flex-col justify-between border border-gray-300 bg-white rounded-br-lg">
          <SidebarContent />
        </div>
      )}
    </>
  );
}
