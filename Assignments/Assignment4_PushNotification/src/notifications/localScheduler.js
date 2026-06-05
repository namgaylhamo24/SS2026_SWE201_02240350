import * as Notifications from 'expo-notifications';
import { channelForBreaking, channelForDigest, channelForTopic } from './channels';

/** Course demo: local notification in 2 seconds (no server). */
export async function fireLocalTestNotification() {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Campus News (local)',
      body: 'This is a local notification — no server needed.',
      sound: 'default',
      data: { screen: 'NewsFeed', type: 'local_test' },
      channelId: channelForTopic(),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
      channelId: channelForTopic(),
    },
  });
}

/** Local preview: fire a topic story notification after a short delay (demo). */
export async function scheduleAnnouncementPreview(announcement, delaySeconds = 15) {
  const channelId = announcement.isBreaking ? channelForBreaking() : channelForTopic();
  return Notifications.scheduleNotificationAsync({
    content: {
      title: announcement.isBreaking ? 'Breaking' : `New in ${announcement.topic}`,
      body: announcement.title,
      sound: 'default',
      categoryIdentifier: announcement.isBreaking ? 'BREAKING_NEWS' : 'TOPIC_UPDATE',
      data: {
        screen: 'AnnouncementDetail',
        announcementId: announcement.id,
        topic: announcement.topic,
        type: 'local_preview',
      },
      channelId,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: Math.max(delaySeconds, 5),
      channelId,
    },
  });
}

export async function scheduleDailyDigest(hour, minute) {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Daily news digest',
      body: 'Catch up on announcements from your subscribed topics.',
      sound: 'default',
      categoryIdentifier: 'DAILY_DIGEST',
      data: { screen: 'NewsFeed', type: 'daily_digest' },
      channelId: channelForDigest(),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      channelId: channelForDigest(),
    },
  });
}

export async function cancelScheduledNotification(notificationId) {
  if (!notificationId) return;
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export async function listScheduledNotifications() {
  return Notifications.getAllScheduledNotificationsAsync();
}
