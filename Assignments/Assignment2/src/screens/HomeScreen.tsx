import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Card from '../components/Card';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Main: undefined;
  Detail: { title: string };
};

type Item = { id: string; title: string };

const items: Item[] = [
  { id: '1', title: 'Study Math' },
  { id: '2', title: 'Read Chapter' },
  { id: '3', title: 'Practice Coding' },
];

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 12 }}>Welcome</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card title={item.title} onPress={() => navigation.navigate('Detail', { title: item.title })} />
        )}
      />
    </View>
  );
}
