import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ContactDetail from '../Screen/ContactDetail';

const Stack = createNativeStackNavigator();

// Root navigator: Stack wraps BottomTabs so ContactDetail
// can slide in over any tab without losing the tab bar state
function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Main screen contains all bottom tabs */}
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        {/* ContactDetail is pushed on top when a contact is tapped */}
        <Stack.Screen
          name="ContactDetail"
          component={ContactDetail}
          options={{
            title: 'Contact Details',
            headerStyle: { backgroundColor: '#1E40AF' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: '700' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;