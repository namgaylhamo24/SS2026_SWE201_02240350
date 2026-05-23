import React, { useEffect, useState } from 'react'
import { View, TextInput, Button, Text, Alert, StyleSheet, Pressable, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import theme from '../styles/theme'
import { useTasks } from '../hooks/useTasks'
import { fetchTask, fetchCategories } from '../api/api'
import axios from 'axios'

export default function TaskForm({ route, navigation }: any) {
  const editId = route.params?.id
  const { create, update } = useTasks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('General')
  const [categories, setCategories] = useState<any[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    if (editId) {
      fetchTask(editId).then(r => {
        setTitle(r.data.title)
        setDescription(r.data.description || '')
        setCategory(r.data.category || 'General')
      }).catch(() => {})
    }
    // fetch categories for dropdown
    fetchCategories()
      .then(r => setCategories(Array.isArray(r.data) ? r.data : []))
      .catch(() => setCategories([]))
  }, [editId])

  const onSave = async () => {
    if (!title || title.length < 3) {
      Alert.alert('Validation', 'Title is required (min 3 chars)')
      return
    }
    const payload = { title, description, category, status: 'todo', createdAt: new Date().toISOString() }
    try {
      if (editId) {
        await update(editId, payload)
      } else {
        await create(payload)
      }
      navigation.goBack()
    } catch (err: unknown) {
      let msg = 'Unable to save task'
      // Axios errors
      if (axios.isAxiosError(err)) {
        if (err.response) {
          msg = `Server ${err.response.status}: ${JSON.stringify(err.response.data)}`
        } else if (err.message) {
          msg = err.message
        }
      } else if (err instanceof Error) {
        // generic JS Error
        msg = err.message
      } else {
        // fallback for unexpected shapes
        msg = String(err)
      }

      console.error('Save task error', err)
      Alert.alert('Error', msg)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Task title" style={styles.input} />

      <Text style={styles.label}>Description</Text>
      <TextInput value={description} onChangeText={setDescription} placeholder="Details" style={[styles.input, { height: 100 }]} multiline />

      <Text style={styles.label}>Category</Text>
      <Pressable style={styles.input} onPress={() => setShowDropdown(s => !s)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>{category}</Text>
          <MaterialIcons name={showDropdown ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} color={theme.colors.muted} />
        </View>
      </Pressable>
      {showDropdown && (
        <View style={styles.dropdown}>
          <ScrollView style={{ maxHeight: 200 }}>
            {categories.length ? categories.map((c) => (
              <Pressable key={c.id} style={styles.option} onPress={() => { setCategory(c.name); setShowDropdown(false) }}>
                <View style={{ width: 10, height: 10, backgroundColor: c.color || '#ccc', borderRadius: 6, marginRight: 8 }} />
                <Text>{c.name}</Text>
              </Pressable>
            )) : (
              <Text style={{ padding: 8, color: theme.colors.muted }}>No categories</Text>
            )}
          </ScrollView>
        </View>
      )}

      <Pressable style={styles.saveBtn} onPress={onSave}>
        <MaterialIcons name="save" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: theme.colors.background, flex: 1 },
  label: { marginBottom: 6, color: theme.colors.muted, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: theme.colors.border, backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  dropdown: { borderWidth: 1, borderColor: theme.colors.border, backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, paddingVertical: 4 },
  option: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  saveBtn: { marginTop: 8, backgroundColor: theme.colors.primary, padding: 14, alignItems: 'center', borderRadius: 10 },
  saveText: { color: '#fff', fontWeight: '700' },
})
