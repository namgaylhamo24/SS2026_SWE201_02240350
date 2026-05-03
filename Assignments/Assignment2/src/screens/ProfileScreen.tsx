import React from 'react';
import { View, Text, Switch, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { theme, darkMode, toggle } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={{ padding: 16 }}>
      <View style={[styles.headerCard, { backgroundColor: theme.colors.card }]}> 
        <Image source={require('../../assets/image.png')} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: theme.colors.text }]}>Namgay Lhamo</Text>
          <Text style={[styles.email, { color: theme.colors.muted }]}>02240350.cst@rub.edu.bt</Text>
          <Text style={[styles.role, { color: theme.colors.primary }]}>BE Software Engineering · Year 2</Text>
        </View>
        
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}> 
          <Text style={[styles.statValue, { color: theme.colors.text }]}>7</Text>
          <Text style={[styles.statLabel, { color: theme.colors.muted }]}>Study Streak</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}> 
          <Text style={[styles.statValue, { color: theme.colors.text }]}>18</Text>
          <Text style={[styles.statLabel, { color: theme.colors.muted }]}>Tasks Done</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}> 
          <Text style={[styles.statValue, { color: theme.colors.text }]}>4h</Text>
          <Text style={[styles.statLabel, { color: theme.colors.muted }]}>This Week</Text>
        </View>
      </View>

      <View style={[styles.progressBlock, { backgroundColor: theme.colors.card }]}> 
        <Text style={[styles.progressTitle, { color: theme.colors.text }]}>Weekly Goal</Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: '60%', backgroundColor: theme.colors.primary }]} />
        </View>
        <Text style={[styles.progressSubtitle, { color: theme.colors.muted }]}>60% complete — 6/10 study sessions</Text>
      </View>

      <View style={[styles.settingsCard, { backgroundColor: theme.colors.card }]}> 
        <View style={styles.rowBetween}>
          <Text style={{ color: theme.colors.text }}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggle} />
        </View>

        <Pressable style={styles.rowItem} onPress={() => {}}>
          <Text style={{ color: theme.colors.text }}>Account Settings</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.muted} />
        </Pressable>

        <Pressable style={styles.rowItem} onPress={() => {}}>
          <Text style={{ color: theme.colors.text }}>Notifications</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.muted} />
        </Pressable>

        <Pressable style={styles.rowItem} onPress={() => {}}>
          <Text style={{ color: theme.colors.text }}>Privacy</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.muted} />
        </Pressable>

        <Pressable style={[styles.signOut, { borderColor: theme.colors.primary }]} onPress={() => {}}>
          <Text style={{ color: theme.colors.primary }}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 16, elevation: 2 },
  avatar: { width: 84, height: 84, borderRadius: 42, marginRight: 12 },
  name: { fontSize: 20, fontWeight: '700' },
  email: { marginTop: 4 },
  role: { marginTop: 6, fontWeight: '600' },
  editBtn: { padding: 8, borderRadius: 8, borderWidth: 1 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statCard: { flex: 1, padding: 12, borderRadius: 10, marginHorizontal: 4, alignItems: 'center', elevation: 2 },
  statValue: { fontSize: 20, fontWeight: '700' },
  statLabel: { marginTop: 6 },
  progressBlock: { padding: 14, borderRadius: 12, marginBottom: 16, elevation: 2 },
  progressTitle: { fontWeight: '700', marginBottom: 8 },
  progressBarTrack: { height: 10, backgroundColor: '#eef3ff', borderRadius: 8, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 8 },
  progressSubtitle: { marginTop: 8 },
  settingsCard: { padding: 12, borderRadius: 12, elevation: 2 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  signOut: { marginTop: 12, padding: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1 }
});
