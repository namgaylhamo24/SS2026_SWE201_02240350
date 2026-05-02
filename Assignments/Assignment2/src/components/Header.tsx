import React from 'react';
import { View, Text } from 'react-native';

export default function Header({ title = 'App' }: { title?: string }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{title}</Text>
    </View>
  );
}
