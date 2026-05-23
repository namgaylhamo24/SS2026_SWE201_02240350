import React from 'react'
import { TaskProvider } from './src/store/TaskContext'
import MainStack from './src/navigation/MainStackNavigator'

export default function App() {
  return (
    <TaskProvider>
      <MainStack />
    </TaskProvider>
  )
}
