import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: true }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}
