import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import AnnouncementDetailScreen from '../screens/AnnouncementDetailScreen';
import ComposeAnnouncementScreen from '../screens/ComposeAnnouncementScreen';
import TopicsScreen from '../screens/TopicsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator({ navigationRef }) {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="NewsFeed" component={NewsFeedScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="AnnouncementDetail"
          component={AnnouncementDetailScreen}
          options={{ title: 'Story' }}
        />
        <Stack.Screen name="Compose" component={ComposeAnnouncementScreen} options={{ title: 'Publish' }} />
        <Stack.Screen name="Topics" component={TopicsScreen} options={{ title: 'My topics' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Notifications' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
