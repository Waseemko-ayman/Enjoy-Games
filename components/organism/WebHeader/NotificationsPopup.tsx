/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Clock, Check, CheckCheck, Bell, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loading from '@/components/molecules/loading';
import useAPI from '@/hook/useAPI';
import useIsMobile from '@/hook/useIsMobile';
import { useToast } from '@/lib/toast';
import CardWrapper from '@/components/atomic/CardWrapper';
import { useUpdateContent } from '@/context/updateContentContext';

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
  getAllNotifications: () => void;
  notifications: Notification[];
  isLoadingAll: boolean;
  errorAll: string;
}

const NotificationsPopup = ({
  notifications,
  getAllNotifications,
  isLoadingAll,
  errorAll,
}: NotificationsPopupProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { showToast } = useToast();
  const isMobile = useIsMobile();
  const t = useTranslations();
  const { refreshFlags } = useUpdateContent();
  const notificationsRefreshKey = 'notifications';

  const { add: readMultiple, isLoading: isReadingMultiple } = useAPI(
    'notifications/read-multiple'
  );

  const { get: readAllUnread, isLoading: isReadingAll } = useAPI(
    'notifications/read-all'
  );

  const { getSingle: readSingle, isLoading: isReadingSingle } =
    useAPI('notifications');

  const readSingleNotification = async (id: string) => {
    try {
      const response = await readSingle(`${id}/read`);
      await getAllNotifications();
      showToast((response as any)?.message ?? 'Marked as read');
    } catch (error) {
      showToast((error as any)?.response?.message, 'error');
    }
  };

  const allNotifications = notifications || [];
  const unreadNotifications = allNotifications.filter(
    (n: Notification) => !n.read_at
  );
  const readNotifications = allNotifications.filter(
    (n: Notification) => n.read_at
  );

  const handleSelectAll = () => {
    if (selectedIds.length === unreadNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(unreadNotifications.map((n: any) => n.id));
    }
  };

  const handleSelectNotification = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleReadMultiple = async () => {
    if (!selectedIds.length) return;
    try {
      const response = await readMultiple({ ids: selectedIds });
      await getAllNotifications();
      setSelectedIds([]);
      showToast(response.message);
    } catch (error) {
      showToast((error as any)?.response?.message, 'error');
    }
  };

  const handleReadAllUnread = async () => {
    try {
      const response = await readAllUnread();
      await getAllNotifications();
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    getAllNotifications();
  }, [getAllNotifications, refreshFlags[notificationsRefreshKey]]);

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
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === unreadNotifications.length &&
                    unreadNotifications.length > 0
                  }
                  onChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">
                  {selectedIds.length > 0
                    ? `${selectedIds.length} selected`
                    : 'Select all unread'}
                </span>
              </div>
              {selectedIds.length > 0 && (
                <Button
                  onClick={handleReadMultiple}
                  disabled={isReadingMultiple}
                  size="sm"
                  className="gap-2"
                >
                  <Check className="h-4 w-4" />
                  Mark Selected
                </Button>
              )}
            </div>
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {unreadNotifications.map((n: any) => (
              <CardWrapper
                key={n.id}
                className="p-2 border-l-4 border-l-primary bg-primary/10 flex items-start gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(n.id)}
                  onChange={() => handleSelectNotification(n.id)}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-1 flex-1">
                      {getNotificationIcon(n.type)}
                      <p className="text-sm">{n.data.message}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                      <Clock className="h-3 w-3" />
                      {formatDate(n.read_at || n.createdAt)}
                      <Button
                        onClick={() => readSingleNotification(n.id)}
                        disabled={isReadingSingle}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardWrapper>
            ))}

            {readNotifications.map((n: any) => (
              <CardWrapper
                key={n.id}
                className="p-2 opacity-60 flex items-start gap-2"
              >
                {getNotificationIcon(n.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{n.data.message}</p>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(n.read_at || n.createdAt)}
                  </div>
                </div>
              </CardWrapper>
            ))}

            {allNotifications.length === 0 && (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No notifications yet
              </div>
            )}
          </div>

          {unreadNotifications.length > 0 && (
            <Button
              onClick={handleReadAllUnread}
              disabled={isReadingAll}
              size="sm"
              className="mt-3 w-full gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              Mark All Read
            </Button>
          )}
        </>
      )}
    </CardWrapper>
  );
};

export default NotificationsPopup;
