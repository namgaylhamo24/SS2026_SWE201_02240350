import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
};

export default function Card({ title, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, elevation: 2 }}>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
      <View style={{ marginTop: 6 }}>
        <Text style={{ color: '#666' }}>Tap to open</Text>
      </View>
    </TouchableOpacity>
  );
}
