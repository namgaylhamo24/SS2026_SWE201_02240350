import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import theme from '../styles/theme'

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: '700', color: '#111827' },
  meta: { color: theme.colors.muted, marginTop: 6 },
  badge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999 },
  badgeText: { color: '#fff', fontWeight: '600', fontSize: 12 },
})

function StatusBadge({ status }: { status: string }) {
  const color = status === 'done' ? '#10B981' : status === 'in-progress' ? theme.colors.accent : theme.colors.primary
  return (
    <View style={[styles.badge, { backgroundColor: color }]}> 
      <Text style={styles.badgeText}>{status}</Text>
    </View>
  )
}

export default function TaskCard({ task, onPress }: any) {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }).start()
  }, [])

  return (
    <Animated.View style={{ opacity }}>
      <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="task" size={20} color={theme.colors.accent} style={{ marginRight: 8 }} />
            <Text style={styles.title}>{task.title}</Text>
          </View>
          <StatusBadge status={task.status || 'todo'} />
        </View>
        <Text style={styles.meta}>{task.category} • {new Date(task.createdAt || Date.now()).toLocaleDateString()}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}
