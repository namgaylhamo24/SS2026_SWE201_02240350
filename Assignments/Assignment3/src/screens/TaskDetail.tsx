import React, { useEffect, useState } from 'react'
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native'
import { fetchTask } from '../api/api'
import { useTasks } from '../hooks/useTasks'
import theme from '../styles/theme'

export default function TaskDetail({ route, navigation }: any) {
  const { id } = route.params
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { remove } = useTasks()

  useEffect(() => {
    fetchTask(id).then(r => setTask(r.data)).catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = () => {
    Alert.alert('Confirm', 'Delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => { await remove(id); navigation.goBack() } }
    ])
  }

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />
  if (!task) return <View style={{ padding: 20 }}><Text>Task not found</Text></View>
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.desc}>{task.description}</Text>
      <Text style={styles.meta}>{task.category} • {task.status}</Text>

      <View style={{ flexDirection: 'row', marginTop: 24 }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Button title="Edit" onPress={() => navigation.navigate('TaskForm', { id: task.id })} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Delete" color={theme.colors.danger} onPress={handleDelete} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: theme.colors.background, flex: 1 },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  desc: { marginTop: 12, color: '#111827', lineHeight: 20 },
  meta: { marginTop: 10, color: theme.colors.muted }
})
