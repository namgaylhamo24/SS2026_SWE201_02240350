import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TaskList from '../screens/TaskList'
import TaskDetail from '../screens/TaskDetail'
import TaskForm from '../screens/TaskForm'

const Stack = createNativeStackNavigator()

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tasks" component={TaskList} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} options={{ title: 'Detail' }} />
        <Stack.Screen name="TaskForm" component={TaskForm} options={{ title: 'Create / Edit' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
