import React, { useCallback, useContext } from 'react'
import { LayoutAnimation } from 'react-native'
import TaskContext from '../store/TaskContext'
import * as api from '../api/api'

type TaskState = { tasks: any[]; loading: boolean; error?: any }
type TaskAction = { type: string; payload?: any }
type TaskContextType = { state: TaskState; dispatch: React.Dispatch<TaskAction> }

export function useTasks() {
  const { state, dispatch } = useContext(TaskContext) as TaskContextType

  const load = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const res = await api.fetchTasks()
      dispatch({ type: 'SET_TASKS', payload: res.data })
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: e })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [dispatch])

  const create = useCallback(
    async (payload: any) => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const res = await api.createTask(payload)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        dispatch({ type: 'ADD_TASK', payload: res.data })
        return res.data
      } catch (e) {
        dispatch({ type: 'SET_ERROR', payload: e })
        throw e
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [dispatch]
  )

  const update = useCallback(
    async (id: number, payload: any) => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const res = await api.updateTask(id, payload)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        dispatch({ type: 'UPDATE_TASK', payload: res.data })
        return res.data
      } catch (e) {
        dispatch({ type: 'SET_ERROR', payload: e })
        throw e
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [dispatch]
  )

  const remove = useCallback(
    async (id: number) => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        await api.deleteTask(id)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        dispatch({ type: 'REMOVE_TASK', payload: id })
      } catch (e) {
        dispatch({ type: 'SET_ERROR', payload: e })
        throw e
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [dispatch]
  )

  // expose convenience props so callers can destructure { tasks, loading, ... }
  return {
    state,
    tasks: state.tasks,
    loading: state.loading,
    load,
    create,
    update,
    remove,
  }
}
