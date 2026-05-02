import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function CategoryScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Categories</Text>
      <TouchableOpacity style={{ padding: 12, backgroundColor: '#f0f0f0', marginBottom: 8 }}>
        <Text>Planner</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 12, backgroundColor: '#f0f0f0', marginBottom: 8 }}>
        <Text>Timers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 12, backgroundColor: '#f0f0f0' }}>
        <Text>Notes</Text>
      </TouchableOpacity>
    </View>
  );
}
