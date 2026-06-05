import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

export function navigateFromNotification(navigationRef, data) {
  const nav = navigationRef.current;
  if (!nav?.isReady()) return;

  if (data.screen === 'AnnouncementDetail' && data.announcementId) {
    nav.navigate('AnnouncementDetail', { id: data.announcementId });
    return;
  }
  if (data.screen === 'NewsFeed' || data.type === 'daily_digest') {
    nav.navigate('NewsFeed', data.topic ? { topic: data.topic } : undefined);
    return;
  }
  if (data.screen === 'Topics') {
    nav.navigate('Topics');
    return;
  }
  if (data.screen === 'Settings') {
    nav.navigate('Settings');
  }
}

export function useNotificationListeners(navigationRef, onForeground) {
  const receivedRef = useRef(null);
  const responseRef = useRef(null);

  useEffect(() => {
    receivedRef.current = Notifications.addNotificationReceivedListener((notification) => {
      const { title, body } = notification.request.content;
      onForeground({
        title: title ?? 'Notification',
        body: body ?? '',
      });
    });

    responseRef.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data ?? {};
      navigateFromNotification(navigationRef, data);
    });

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!response) return;
      const data = response.notification.request.content.data ?? {};
      setTimeout(() => navigateFromNotification(navigationRef, data), 400);
    });

    return () => {
      receivedRef.current?.remove();
      responseRef.current?.remove();
    };
  }, [navigationRef, onForeground]);
}
