import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const NOTICES = [
  { id: '1', title: 'Semester Registration', body: 'Registration opens on 1st May. Submit documents early.' },
  { id: '2', title: 'Library Hours', body: 'Library will be open 8am-10pm during exams.' },
  { id: '3', title: 'Guest Lecture', body: 'Join the AI guest lecture on Friday at 3pm.' },
];

const NoticeBoard: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.header}>Notice Board</Text>
      {NOTICES.map((n) => (
        <View key={n.id} style={styles.card}>
          <Text style={styles.title}>{n.title}</Text>
          <Text style={styles.body}>{n.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  body: { marginTop: 6, color: '#475569' },
});

export default NoticeBoard;