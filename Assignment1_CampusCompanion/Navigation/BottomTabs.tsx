import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../Screen/HomeScreen';
import ContactsScreen from '../Screen/ContactsScreen';
import ScheduleScreen from '../Screen/ScheduleScreen';
import NoticeBoard from '../Screen/NoticeBoard';

const Tab = createBottomTabNavigator();

// Simple emoji icon component for tab bar
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
        options={{ tabBarIcon: () => <TabIcon emoji="🏠" /> }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ tabBarIcon: () => <TabIcon emoji="📋" /> }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ tabBarIcon: () => <TabIcon emoji="📅" /> }}
      />
      <Tab.Screen
        name="NoticeBoard"
        component={NoticeBoard}
        options={{
          title: 'Notices',
          tabBarIcon: () => <TabIcon emoji="📌" />,
        }}
      />
    </Tab.Navigator>
  );
}