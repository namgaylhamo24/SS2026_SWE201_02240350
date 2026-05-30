import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TOPICS } from '../topics/topics';
import theme from '../styles/theme';

export default function AnnouncementCard({ item, onPress }) {
  const topicMeta = TOPICS.find((t) => t.id === item.topic);
  const topicColor = topicMeta?.color ?? theme.colors.primary;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.row}>
        <View style={[styles.topicBadge, { backgroundColor: topicColor }]}>
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
      <Text style={styles.summary} numberOfLines={2}>
        {item.summary}
      </Text>
      <Text style={styles.date}>{new Date(item.publishedAt).toLocaleString()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  topicBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  topicText: { color: '#fff', fontWeight: '700', fontSize: 11 },
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
  title: { fontSize: 17, fontWeight: '800', color: '#111827' },
  summary: { marginTop: 6, color: '#4B5563', lineHeight: 20 },
  date: { marginTop: 8, fontSize: 12, color: theme.colors.muted },
});
