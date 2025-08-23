/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Clock, Check, CheckCheck, Bell, AlertCircle } from 'lucide-react';
import Loading from '@/components/molecules/loading';
import useAPI from '@/hook/useAPI';
import useIsMobile from '@/hook/useIsMobile';
import { useToast } from '@/lib/toast';
import CardWrapper from '@/components/atomic/CardWrapper';
import Button from '@/components/atomic/Button';
import { FaCheck } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/data/paths';

interface Notification {
  id: string;
  data: {
    ticket_id?: number;
    subject?: string;
    message: string;
  };
  read_at: string | null;
}

interface NotificationsPopupProps {
  notifications: Notification[];
  isLoadingAll: boolean;
  errorAll: string;
}

const NotificationsPopup = ({
  notifications: initialNotifications,
  isLoadingAll,
  errorAll,
}: NotificationsPopupProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications || []
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { showToast } = useToast();
  const isMobile = useIsMobile();
  const t = useTranslations();

  const router = useRouter();

  const { add: readMultiple, isLoading: isReadingMultiple } = useAPI(
    'notifications/read-multiple'
  );
  const { get: readAllUnread, isLoading: isReadingAll } = useAPI(
    'notifications/read-all'
  );
  const { getSingle: readSingle } = useAPI('notifications');

  useEffect(() => {
    setNotifications(initialNotifications || []);
  }, [initialNotifications]);

  const markAsReadLocally = (ids: string[]) => {
    setNotifications((prev) =>
      prev.map((n) =>
        ids.includes(n.id) ? { ...n, read_at: new Date().toISOString() } : n
      )
    );
  };

  const handleReadSingle = async (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    if (!notification || notification.read_at) return;

    try {
      const response = await readSingle(`${id}/read`);
      markAsReadLocally([id]);
      showToast((response as any)?.message ?? 'Marked as read');
    } catch (error) {
      showToast((error as any)?.response?.message, 'error');
    }
  };

  const handleReadMultiple = async () => {
    if (!selectedIds.length) return;
    try {
      const response = await readMultiple({ ids: selectedIds });
      markAsReadLocally(selectedIds);
      setSelectedIds([]);
      showToast(response.message);
    } catch (error) {
      showToast((error as any)?.response?.message, 'error');
    }
  };

  const handleReadAllUnread = async () => {
    try {
      const response = await readAllUnread();
      markAsReadLocally(
        notifications.filter((n) => !n.read_at).map((n) => n.id)
      );
      setSelectedIds([]);
      showToast(
        Array.isArray(response)
          ? ''
          : (response as { message?: string })?.message ?? ''
      );
    } catch (error) {
      showToast((error as any)?.response?.message, 'error');
    }
  };

  const allNotifications = notifications;
  const unreadNotifications = allNotifications.filter((n) => !n.read_at);
  const readNotifications = allNotifications.filter((n) => n.read_at);

  const handleSelectAll = () => {
    if (selectedIds.length === unreadNotifications.length) setSelectedIds([]);
    else setSelectedIds(unreadNotifications.map((n) => n.id));
  };

  const handleSelectNotification = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return t('Messages.justNow');
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return t('Messages.justNow');
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    const passedTime = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return t('Messages.justNow');
    if (diffInHours < 24) return `${diffInHours}${t('Messages.hourAgo')}`;
    if (diffInHours < 168)
      return `${passedTime}${
        passedTime < 2 ? t('Messages.dayAgo') : t('Messages.daysAgo')
      }`;
    return date.toLocaleDateString();
  };

  return (
    <CardWrapper
      className={`${
        isMobile
          ? 'fixed top-28 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] z-50'
          : 'absolute top-[120%] left-0 w-[350px] z-50'
      } bg-white p-3 shadow-xl`}
    >
      <h2 className="text-lg font-semibold mb-3">
        {t('sidebar.notifications')}
      </h2>

      {isLoadingAll ? (
        <Loading />
      ) : errorAll ? (
        <div className="p-2 text-red-500 text-sm mb-2">
          {t('Messages.errorNotifications')} {errorAll}
        </div>
      ) : (
        <>
          {unreadNotifications.length > 0 && (
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <label className="flex items-center cursor-pointer select-none gap-3">
                  <input
                    name="unread Notifications checkbox"
                    type="checkbox"
                    checked={
                      selectedIds.length === unreadNotifications.length &&
                      unreadNotifications.length > 0
                    }
                    onChange={handleSelectAll}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 rounded-sm border border-gray-300 peer-checked:bg-green-600 flex items-center justify-center transition-colors">
                    {!!selectedIds && (
                      <FaCheck className="w-3 h-3 text-white" />
                    )}
                  </div>
                </label>
                <span className="text-sm text-muted-foreground">
                  {selectedIds.length > 0
                    ? `${selectedIds.length} selected`
                    : t('Messages.selectAllUnread')}
                </span>
              </div>
              {selectedIds.length > 0 && (
                <Button
                  handleClick={handleReadMultiple}
                  disabled={isReadingMultiple}
                  otherClassName="text-sm px-3 py-1"
                >
                  <Check className="w-4 h-4" />
                  {t('Messages.readable')}
                </Button>
              )}
            </div>
          )}

          <div className="max-h-96 overflow-y-auto scrollbar-none">
            {unreadNotifications.map((n: any) => (
              <div
                key={n.id}
                className="py-2 border-b border-gray-200 flex items-center justify-between gap-2 cursor-pointer"
                onClick={() => {
                  if (n.data.ticket_id) {
                    handleReadSingle(n.id);
                    router.push(PATHS.TICKETS.ITEM(n.data.ticket_id).link);
                  }
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="space-y-2">
                    <div className="flex items-start gap-1 flex-1">
                      {getNotificationIcon(n.type)}
                      <div>
                        <p className="text-sm">{n.data.message}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                          <Clock className="h-3 w-3" />
                          {formatDate(n.read_at || n.createdAt)}
                          {/* <Button
                            handleClick={() => readSingleNotification(n.id)}
                            disabled={isReadingSingle}
                            otherClassName="h-6 w-6 p-0"
                          >
                            <Check className="w-4 h-4" />
                          </Button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <label
                  className="flex items-center cursor-pointer select-none gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    name="unread Notifications checkbox"
                    checked={selectedIds.includes(n.id)}
                    onChange={() => handleSelectNotification(n.id)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 rounded-sm border border-gray-300 peer-checked:bg-green-600 flex items-center justify-center transition-colors">
                    {!!selectedIds && (
                      <FaCheck className="w-3 h-3 text-white" />
                    )}
                  </div>
                </label>
              </div>
            ))}

            {readNotifications.map((n: any) => (
              <div
                key={n.id}
                className="py-2 border-b border-gray-200 opacity-60 flex items-start gap-2 cursor-pointer"
                onClick={() => {
                  if (n.data.ticket_id) {
                    handleReadSingle(n.id);
                    router.push(PATHS.TICKETS.ITEM(n.data.ticket_id).link);
                  }
                }}
              >
                {getNotificationIcon(n.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{n.data.message}</p>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(n.read_at || n.createdAt)}
                  </div>
                </div>
              </div>
            ))}

            {allNotifications.length === 0 && (
              <div className="text-center py-4 text-sm text-muted-foreground">
                {t('Messages.noNotifications')}
              </div>
            )}
          </div>

          {unreadNotifications.length > 0 && (
            <Button
              handleClick={handleReadAllUnread}
              disabled={isReadingAll}
              otherClassName="py-1.5 text-sm mt-3 w-full gap-2 rounded-md"
            >
              <CheckCheck className="w-4 h-4" />
              {t('Messages.selectAllUnread')}
            </Button>
          )}
        </>
      )}
    </CardWrapper>
  );
};

export default NotificationsPopup;
