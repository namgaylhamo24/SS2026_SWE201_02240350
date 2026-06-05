import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNews } from '../store/NewsStore';
import AnnouncementCard from '../components/AnnouncementCard';
import { TOPICS } from '../topics/topics';
import theme from '../styles/theme';

export default function NewsFeedScreen({ navigation, route }) {
  const { announcements, loading, topicSubscriptions } = useNews();
  const initialTopic = route.params?.topic ?? 'All';
  const [filter, setFilter] = useState(initialTopic);

  const filtered = useMemo(() => {
    let list = [...announcements].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
    );
    if (filter !== 'All') {
      list = list.filter((a) => a.topic === filter);
    } else {
      list = list.filter((a) => topicSubscriptions[a.topic]);
    }
    return list;
  }, [announcements, filter, topicSubscriptions]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus News</Text>
        <View style={styles.headerActions}>
          <Pressable onPress={() => navigation.navigate('Topics')}>
            <MaterialIcons name="topic" size={26} color={theme.colors.primary} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Settings')} style={{ marginLeft: 14 }}>
            <MaterialIcons name="notifications" size={26} color={theme.colors.primary} />
          </Pressable>
        </View>
      </View>

      <FlatList
        horizontal
        data={['All', ...TOPICS.map((t) => t.id)]}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.chips}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.chip, filter === item && styles.chipActive]}
            onPress={() => setFilter(item)}
          >
            <Text style={[styles.chipText, filter === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        )}
      />

      <Pressable style={styles.composeBtn} onPress={() => navigation.navigate('Compose')}>
        <MaterialIcons name="post-add" size={20} color="#fff" />
        <Text style={styles.composeText}>Publish announcement</Text>
      </Pressable>

      {filtered.length === 0 ? (
        <Text style={styles.empty}>
          No stories for this filter. Subscribe to topics or publish a new announcement.
        </Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AnnouncementCard
              item={item}
              onPress={() => navigation.navigate('AnnouncementDetail', { id: item.id })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  headerTitle: { fontSize: 22, fontWeight: '800' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  chips: { maxHeight: 48, marginVertical: 10 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 8,
  },
  chipActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  chipText: { color: '#374151', fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  composeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: theme.colors.accent,
    paddingVertical: 11,
    borderRadius: 10,
  },
  composeText: { color: '#fff', fontWeight: '700' },
  empty: { textAlign: 'center', color: theme.colors.muted, padding: 32, lineHeight: 22 },
});
