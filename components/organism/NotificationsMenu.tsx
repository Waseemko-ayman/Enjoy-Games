/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useAPI from '@/hook/useAPI';
import { useRef, useEffect } from 'react';
import { FaRegBell } from 'react-icons/fa';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';
import NotificationsPopup from './WebHeader/NotificationsPopup';
import { useUpdateContent } from '@/context/updateContentContext';

interface NotificationsMenuProps {
  isOpen?: boolean;
  setIsNotificationsOpen?: (open: boolean) => void;
  otherClassName?: string;
}

const NotificationsMenu = ({
  isOpen,
  setIsNotificationsOpen,
  otherClassName,
}: NotificationsMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Context
  const { refreshFlags } = useUpdateContent();
  const ticketsRefreshFlag = refreshFlags['tickets'];
  const notifRefreshFlag = refreshFlags['notifications'];

  // API Hook
  const {
    get: get,
    data: notifications,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useAPI<any>('notifications');

  const iconsStyle = `${otherClassName} text-[var(--enjoy-primary-deep)] cursor-pointer`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (setIsNotificationsOpen) setIsNotificationsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsNotificationsOpen]);

  useEffect(() => {
    get();
  }, [get, notifRefreshFlag, ticketsRefreshFlag]);

  return (
    <div className="relative" ref={menuRef}>
      <AnimatedWrapper direction="y" distance={-40}>
        <div className="relative">
          <FaRegBell
            className={iconsStyle}
            onClick={() => {
              if (setIsNotificationsOpen) setIsNotificationsOpen(!isOpen);
            }}
          />
          {notifications && notifications.length > 0 && (
            <>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </>
          )}
        </div>
      </AnimatedWrapper>

      {isOpen && (
        <NotificationsPopup
          getAllNotifications={get}
          notifications={notifications}
          isLoadingAll={isLoadingAll}
          errorAll={errorAll}
        />
      )}
    </div>
  );
};

export default NotificationsMenu;
