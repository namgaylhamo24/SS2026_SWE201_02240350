import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

/** Android channels — create `default` first (course notes), then topic-specific channels. */
export async function setupNotificationChannels() {
  if (Platform.OS !== 'android') return;

  await Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#4F46E5',
    sound: 'default',
    enableVibrate: true,
  });

  await Notifications.setNotificationChannelAsync('breaking-news', {
    name: 'Breaking news',
    description: 'Urgent alerts and breaking stories',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 300, 150, 300],
    lightColor: '#DC2626',
    sound: 'default',
    enableVibrate: true,
  });

  await Notifications.setNotificationChannelAsync('topic-updates', {
    name: 'Topic updates',
    description: 'New stories in topics you follow',
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: 'default',
  });

  await Notifications.setNotificationChannelAsync('daily-digest', {
    name: 'Daily digest',
    description: 'Once-a-day news roundup reminder',
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: 'default',
  });
}

export function channelForBreaking() {
  return Platform.OS === 'android' ? 'breaking-news' : 'default';
}

export function channelForTopic() {
  return Platform.OS === 'android' ? 'topic-updates' : 'default';
}

export function channelForDigest() {
  return Platform.OS === 'android' ? 'daily-digest' : 'default';
}
