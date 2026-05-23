import React, { useEffect } from 'react'
import { View, Text, FlatList, Pressable, ActivityIndicator, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useTasks } from '../hooks/useTasks'
import TaskCard from '../components/TaskCard'
import theme from '../styles/theme'

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { padding: 16, paddingTop: 20, borderBottomWidth: 1, borderColor: theme.colors.border, backgroundColor: '#fff' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  apiText: { fontSize: 12, color: theme.colors.muted, marginTop: 6 },
  createBtn: { margin: 16, backgroundColor: theme.colors.primary, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  createBtnText: { color: '#fff', fontWeight: '700' },
  empty: { padding: 40, alignItems: 'center' }
})

export default function TaskList({ navigation }: any) {
  const { tasks, loading, load } = useTasks()

  useEffect(() => {
    load()
  }, [])

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
      </View>

      <Pressable style={styles.createBtn} onPress={() => navigation.navigate('TaskForm')}>
        <MaterialIcons name="add" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.createBtnText}>Create Task</Text>
      </Pressable>

      {tasks.length === 0 ? (
        <View style={styles.empty}><Text style={{ color: theme.colors.muted }}>No tasks yet — tap "Create Task" to add one.</Text></View>
      ) : (
        <FlatList data={tasks} keyExtractor={t => String(t.id)} renderItem={({ item }) => (
          <TaskCard task={item} onPress={() => navigation.navigate('TaskDetail', { id: item.id })} />
        )} />
      )}
    </View>
  )
}
