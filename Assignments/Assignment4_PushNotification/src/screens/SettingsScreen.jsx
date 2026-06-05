import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  getPermissionState,
  registerForPushNotificationsAsync,
  permissionLabel,
  requestNotificationPermissions,
} from '../notifications/setup';
import {
  cancelScheduledNotification,
  scheduleDailyDigest,
  listScheduledNotifications,
  fireLocalTestNotification,
} from '../notifications/localScheduler';
import {
  registerDevice,
  requestTestPush,
  sendTopicBroadcast,
  publishRemoteAnnouncement,
  API_BASE_URL,
} from '../api/pushApi';
import { useNews } from '../store/NewsStore';
import theme from '../styles/theme';

export default function SettingsScreen() {
  const { deviceId, dailyDigest, setDailyDigest, subscribedTopics } = useNews();
  const [permission, setPermission] = useState('undetermined');
  const [pushToken, setPushToken] = useState(null);
  const [loadingPerm, setLoadingPerm] = useState(false);
  const [loadingToken, setLoadingToken] = useState(false);
  const [loadingPush, setLoadingPush] = useState(false);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const refreshPermission = useCallback(async () => {
    setPermission(await getPermissionState());
  }, []);

  const refreshScheduled = useCallback(async () => {
    const list = await listScheduledNotifications();
    setScheduledCount(list.length);
  }, []);

  useEffect(() => {
    refreshPermission();
    refreshScheduled();
  }, [refreshPermission, refreshScheduled]);

  const onRequestPermission = async () => {
    setLoadingPerm(true);
    const status = await requestNotificationPermissions();
    setPermission(status);
    setLoadingPerm(false);
  };

  const onRegisterToken = async () => {
    setLoadingToken(true);
    try {
      const token = await registerForPushNotificationsAsync();
      setPushToken(token);
      if (!token) return;
      const topics = subscribedTopics();
      await registerDevice({ deviceId, pushToken: token, topics });
      Alert.alert(
        'Registered',
        `Token saved on backend.\nTopics: ${topics.join(', ') || 'none'}\n\nCopy the token to test at https://expo.dev/notifications`,
      );
    } catch (e) {
      Alert.alert('Registration failed', e.message || String(e));
    } finally {
      setLoadingToken(false);
    }
  };

  const onLocalTest = async () => {
    if (permission !== 'granted') {
      Alert.alert('Permission required', 'Grant notification permission first.');
      return;
    }
    await fireLocalTestNotification();
    Alert.alert('Scheduled', 'Local notification in 2 seconds (lock the phone to see it in the tray).');
  };

  const onTestRemotePush = async () => {
    setLoadingPush(true);
    try {
      await requestTestPush({
        deviceId,
        title: 'Campus News',
        body: 'Test: new story available in your feed.',
        data: { screen: 'NewsFeed', type: 'remote_test' },
      });
      Alert.alert('Sent', 'Check your device for the remote notification.');
    } catch (e) {
      Alert.alert('Push failed', e.response?.data?.error || e.message || String(e));
    } finally {
      setLoadingPush(false);
    }
  };

  const onBroadcastAlerts = async () => {
    setLoadingPush(true);
    try {
      await sendTopicBroadcast({
        topic: 'Alerts',
        title: 'Campus alert',
        body: 'Important safety update — tap to read.',
        data: {
          screen: 'NewsFeed',
          topic: 'Alerts',
          type: 'topic_broadcast',
        },
      });
      Alert.alert('Broadcast sent', 'Devices subscribed to "Alerts" were notified.');
    } catch (e) {
      Alert.alert('Broadcast failed', e.response?.data?.error || e.message || String(e));
    } finally {
      setLoadingPush(false);
    }
  };

  const onPublishRemote = async () => {
    setLoadingPush(true);
    try {
      await publishRemoteAnnouncement({
        topic: 'Campus',
        title: 'Remote: Registration opens Monday',
        body: 'Course registration for fall semester opens Monday at 8 AM.',
        announcementId: 'remote_demo_1',
      });
      Alert.alert('Published', 'Remote announcement sent to Campus subscribers.');
    } catch (e) {
      Alert.alert('Publish failed', e.response?.data?.error || e.message || String(e));
    } finally {
      setLoadingPush(false);
    }
  };

  const onToggleDaily = async (enabled) => {
    if (dailyDigest.notificationId) {
      await cancelScheduledNotification(dailyDigest.notificationId);
    }
    if (!enabled) {
      setDailyDigest({ ...dailyDigest, enabled: false, notificationId: null });
      await refreshScheduled();
      return;
    }
    if (permission !== 'granted') {
      Alert.alert('Permission required', 'Grant notification permission first.');
      return;
    }
    try {
      const id = await scheduleDailyDigest(dailyDigest.hour, dailyDigest.minute);
      setDailyDigest({ ...dailyDigest, enabled: true, notificationId: id });
      Alert.alert(
        'Daily digest on',
        `Scheduled every day at ${dailyDigest.hour}:${String(dailyDigest.minute).padStart(2, '0')}`,
      );
      await refreshScheduled();
    } catch (e) {
      Alert.alert('Schedule failed', e.message || String(e));
    }
  };

  const dailyDate = new Date();
  dailyDate.setHours(dailyDigest.hour, dailyDigest.minute, 0, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.section}>Permissions</Text>
      <Text style={styles.row}>
        Status: <Text style={styles.value}>{permissionLabel(permission)}</Text>
      </Text>
      <Pressable style={styles.btn} onPress={onRequestPermission} disabled={loadingPerm}>
        {loadingPerm ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Request permission</Text>}
      </Pressable>

      <Text style={styles.section}>Expo push token</Text>
      <Text style={styles.hint}>
        Run eas init first. Token format: ExponentPushToken[...]
      </Text>
      <Text style={styles.label}>Your push token:</Text>
      <Text style={styles.token} selectable numberOfLines={4}>
        {pushToken || 'Tap "Get push token" below'}
      </Text>
      <Pressable style={styles.btn} onPress={onRegisterToken} disabled={loadingToken}>
        {loadingToken ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Get push token & register backend</Text>
        )}
      </Pressable>
      <Text style={styles.hint}>
        Step 8 (course): paste token at https://expo.dev/notifications — Title, Body, Data
        {` {"screen":"NewsFeed","topic":"Campus"}`}
      </Text>

      <Text style={styles.section}>Local notification (Step 6 demo)</Text>
      <Pressable style={[styles.btn, styles.btnSecondary]} onPress={onLocalTest}>
        <Text style={styles.btnText}>Fire LOCAL notification (2s)</Text>
      </Pressable>

      <Text style={styles.section}>Remote push via backend</Text>
      <Text style={styles.hint}>Backend: {API_BASE_URL}</Text>
      <Text style={styles.hint}>Device ID: {deviceId}</Text>
      <Text style={styles.hint}>Subscribed topics: {subscribedTopics().join(', ') || 'none'}</Text>
      <Pressable style={[styles.btn, styles.btnSecondary]} onPress={onTestRemotePush} disabled={loadingPush}>
        <Text style={styles.btnText}>Send test push to this device</Text>
      </Pressable>
      <Pressable style={[styles.btn, styles.btnSecondary]} onPress={onBroadcastAlerts} disabled={loadingPush}>
        <Text style={styles.btnText}>Broadcast to &quot;Alerts&quot; topic</Text>
      </Pressable>
      <Pressable style={[styles.btn, styles.btnSecondary]} onPress={onPublishRemote} disabled={loadingPush}>
        <Text style={styles.btnText}>Publish remote Campus story</Text>
      </Pressable>

      <Text style={styles.section}>Daily news digest (local)</Text>
      <Pressable style={styles.input} onPress={() => setShowTimePicker(true)}>
        <Text>
          Time: {dailyDigest.hour}:{String(dailyDigest.minute).padStart(2, '0')}
        </Text>
      </Pressable>
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={dailyDate}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            setShowTimePicker(Platform.OS === 'ios');
            if (date) {
              setDailyDigest({
                ...dailyDigest,
                hour: date.getHours(),
                minute: date.getMinutes(),
              });
            }
          }}
        />
      )}
      <Pressable style={styles.btn} onPress={() => onToggleDaily(!dailyDigest.enabled)}>
        <Text style={styles.btnText}>
          {dailyDigest.enabled ? 'Disable daily digest' : 'Enable daily digest (8 PM default)'}
        </Text>
      </Pressable>

      <Text style={styles.section}>Local schedules</Text>
      <Text style={styles.hint}>{scheduledCount} notification(s) scheduled on this device</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 40 },
  section: { fontSize: 18, fontWeight: '800', marginTop: 16, marginBottom: 8, color: '#111827' },
  row: { fontSize: 15, marginBottom: 8 },
  value: { fontWeight: '700', color: theme.colors.primary },
  hint: { fontSize: 13, color: theme.colors.muted, marginBottom: 6, lineHeight: 18 },
  label: { fontSize: 13, color: theme.colors.muted, marginBottom: 4 },
  token: { fontSize: 11, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', marginBottom: 8, color: '#111827' },
  btn: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnSecondary: { backgroundColor: theme.colors.accent },
  btnText: { color: '#fff', fontWeight: '700' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
});
