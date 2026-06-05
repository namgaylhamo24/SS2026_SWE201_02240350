import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { useNews } from '../store/NewsStore';
import { TOPICS } from '../topics/topics';
import theme from '../styles/theme';

export default function ComposeAnnouncementScreen({ navigation }) {
  const { addAnnouncement } = useNews();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [topic, setTopic] = useState('Campus');
  const [isBreaking, setIsBreaking] = useState(false);
  const [scheduleLocal, setScheduleLocal] = useState(true);
  const [saving, setSaving] = useState(false);

  const onPublish = async () => {
    if (!title.trim() || title.trim().length < 5) {
      Alert.alert('Validation', 'Headline must be at least 5 characters.');
      return;
    }
    if (!body.trim()) {
      Alert.alert('Validation', 'Story body is required.');
      return;
    }

    setSaving(true);
    try {
      const item = await addAnnouncement({
        title: title.trim(),
        body: body.trim(),
        summary: body.trim().slice(0, 120),
        topic,
        isBreaking,
        scheduleLocalPreview: scheduleLocal,
        previewDelaySeconds: 15,
      });
      Alert.alert(
        'Published',
        scheduleLocal
          ? `Story saved. A local notification will fire in ~15 seconds. ID: ${item.id}`
          : 'Story saved to the feed.',
      );
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message || String(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Headline</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Announcement title" />

      <Text style={styles.label}>Story</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={body}
        onChangeText={setBody}
        multiline
        placeholder="Full announcement text"
      />

      <Text style={styles.label}>Topic</Text>
      <View style={styles.chips}>
        {TOPICS.map((t) => (
          <Pressable
            key={t.id}
            style={[styles.chip, topic === t.id && { backgroundColor: t.color, borderColor: t.color }]}
            onPress={() => setTopic(t.id)}
          >
            <Text style={[styles.chipText, topic === t.id && styles.chipTextActive]}>{t.id}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Mark as breaking news</Text>
        <Switch value={isBreaking} onValueChange={setIsBreaking} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Schedule local preview (15s)</Text>
        <Switch value={scheduleLocal} onValueChange={setScheduleLocal} />
      </View>

      <Pressable style={styles.saveBtn} onPress={onPublish} disabled={saving}>
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Publish to feed</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.colors.background },
  label: { fontWeight: '600', color: theme.colors.muted, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  multiline: { minHeight: 120, textAlignVertical: 'top' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#fff',
  },
  chipText: { color: '#374151', fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  saveBtn: {
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
