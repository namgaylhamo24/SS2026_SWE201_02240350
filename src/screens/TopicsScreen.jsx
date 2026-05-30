import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNews } from '../store/NewsStore';
import NotificationToggle from '../components/NotificationToggle';
import { TOPICS } from '../topics/topics';
import theme from '../styles/theme';

export default function TopicsScreen() {
  const { topicSubscriptions, setTopicSubscription } = useNews();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.intro}>
        Choose which topics send you push notifications. Your selections are sent to the server when
        you register your device.
      </Text>
      {TOPICS.map((topic) => (
        <View key={topic.id} style={styles.card}>
          <View style={[styles.dot, { backgroundColor: topic.color }]} />
          <View style={styles.info}>
            <Text style={styles.name}>{topic.label}</Text>
            <Text style={styles.desc}>{topic.description}</Text>
          </View>
          <NotificationToggle
            label=""
            value={Boolean(topicSubscriptions[topic.id])}
            onValueChange={(v) => setTopicSubscription(topic.id, v)}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 32 },
  intro: { color: theme.colors.muted, lineHeight: 22, marginBottom: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 10,
  },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  info: { flex: 1, marginRight: 8 },
  name: { fontSize: 16, fontWeight: '700', color: '#111827' },
  desc: { fontSize: 13, color: theme.colors.muted, marginTop: 4 },
});
