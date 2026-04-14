import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../Screen/HomeScreen';
import ContactsScreen from '../Screen/ContactsScreen';
import ScheduleScreen from '../Screen/ScheduleScreen';
import NoticeBoard from '../Screen/NoticeBoard';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// Simple emoji icon component for tab bar (fallback)
const TabIcon = ({ emoji }: { emoji: string }) => (
  <Text style={{ fontSize: 20 }}>{emoji}</Text>
);

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1E40AF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size ?? 24} color={color} /> }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size ?? 24} color={color} /> }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ tabBarIcon: ({ color, size }) => <AntDesign name="calendar" size={size ?? 24} color={color} /> }}
      />
      <Tab.Screen
        name="NoticeBoard"
        component={NoticeBoard}
        options={{
          title: 'Notices',
          tabBarIcon: ({ color, size }) => <AntDesign name="notification" size={size ?? 24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}