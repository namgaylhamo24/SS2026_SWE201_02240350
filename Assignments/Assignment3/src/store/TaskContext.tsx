import React, { createContext, useReducer, useEffect } from 'react'
import { LayoutAnimation, Platform, UIManager } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Task = {
  id: number
  title: string
  description?: string
  category?: string
  status?: string
}

type State = { tasks: Task[]; loading: boolean }

const initialState: State = { tasks: [], loading: true }

type Action =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload }
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id === action.payload.id ? action.payload : t)),
      }
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

const TaskContext = createContext<any>(null)

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    // Enable LayoutAnimation on Android
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    ;(async () => {
      try {
        const raw = await AsyncStorage.getItem('tasks')
        if (raw) dispatch({ type: 'SET_TASKS', payload: JSON.parse(raw) })
      } catch (e) {
        // ignore
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    })()
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(state.tasks)).catch(() => {})
  }, [state.tasks])

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
}

export default TaskContext
