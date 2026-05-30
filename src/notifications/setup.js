import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { setupNotificationChannels } from './channels';

// Global handler — must run before any notification arrives (course notes, Step 6).
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Asks permission, sets Android channels, returns Expo push token.
 * Reads projectId from app.config.js → extra.eas.projectId (written by `eas init`).
 */
export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert(
      'Physical device required',
      'Please use a physical device for push notifications.',
    );
    return null;
  }

  // Android: channel must exist BEFORE requesting the token (course notes).
  await setupNotificationChannels();

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Permission denied', 'Permission for notifications was denied.');
    return null;
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;

  if (!projectId) {
    Alert.alert('No projectId found', 'Did you run `eas login` and `eas init`?');
    return null;
  }

  try {
    const tokenResponse = await Notifications.getExpoPushTokenAsync({ projectId });
    return tokenResponse.data;
  } catch (err) {
    console.error('getExpoPushTokenAsync failed:', err);
    Alert.alert('Push token error', String(err));
    return null;
  }
}

export async function getPermissionState() {
  const { status } = await Notifications.getPermissionsAsync();
  return status;
}

export async function requestNotificationPermissions() {
  if (!Device.isDevice) {
    Alert.alert('Physical device required', 'Use a real phone or a development build.');
    return 'denied';
  }
  await setupNotificationChannels();
  const existing = await Notifications.getPermissionsAsync();
  let finalStatus = existing.status;
  if (existing.status !== 'granted') {
    const requested = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
    finalStatus = requested.status;
  }
  if (finalStatus === 'denied') {
    Alert.alert('Notifications disabled', 'Enable notifications in system settings.');
  }
  return finalStatus;
}

/** Alias used by Settings — same as registerForPushNotificationsAsync. */
export async function getExpoPushToken() {
  return registerForPushNotificationsAsync();
}

export function permissionLabel(state) {
  switch (state) {
    case 'granted':
      return 'Granted';
    case 'denied':
      return 'Denied';
    case 'restricted':
      return 'Restricted';
    default:
      return 'Not asked yet';
  }
}
