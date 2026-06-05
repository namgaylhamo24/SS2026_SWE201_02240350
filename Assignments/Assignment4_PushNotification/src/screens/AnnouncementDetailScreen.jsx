import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNews } from '../store/NewsStore';
import { TOPICS } from '../topics/topics';
import theme from '../styles/theme';

export default function AnnouncementDetailScreen({ route }) {
  const { id } = route.params;
  const { getAnnouncement, loading } = useNews();
  const item = useMemo(() => getAnnouncement(id), [getAnnouncement, id, loading]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.primary} />;
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Announcement not found.</Text>
      </View>
    );
  }

  const topicMeta = TOPICS.find((t) => t.id === item.topic);

  return (
    <View style={styles.container}>
      <View style={styles.metaRow}>
        <View style={[styles.topicBadge, { backgroundColor: topicMeta?.color ?? theme.colors.primary }]}>
          <Text style={styles.topicText}>{item.topic}</Text>
        </View>
        {item.isBreaking && (
          <View style={styles.breaking}>
            <MaterialIcons name="bolt" size={14} color="#fff" />
            <Text style={styles.breakingText}>Breaking</Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{new Date(item.publishedAt).toLocaleString()}</Text>
      <Text style={styles.body}>{item.body}</Text>
      {item.localNotificationId && (
        <Text style={styles.note}>Local preview notification scheduled for this story.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.colors.background },
  metaRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  topicBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  topicText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  breaking: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
  },
  breakingText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  title: { fontSize: 26, fontWeight: '800', color: '#111827', lineHeight: 32 },
  date: { marginTop: 8, color: theme.colors.muted },
  body: { marginTop: 20, fontSize: 16, lineHeight: 26, color: '#1F2937' },
  note: { marginTop: 24, fontSize: 13, color: theme.colors.accent },
});
