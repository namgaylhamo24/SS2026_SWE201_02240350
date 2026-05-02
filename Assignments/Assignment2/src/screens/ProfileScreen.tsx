import React from 'react';
import { View, Text, Switch } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Profile</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>Dark Mode</Text>
        <Switch value={false} onValueChange={() => {}} />
      </View>
    </View>
  );
}
