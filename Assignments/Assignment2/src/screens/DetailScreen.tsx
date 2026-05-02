import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

export default function DetailScreen() {
  const route = useRoute<RouteProp<Record<string, object | undefined>, string>>();
  const title = (route.params as any)?.title ?? 'Detail';

  const slide = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.spring(slide, { toValue: 0, useNativeDriver: true })
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Animated.View style={{ transform: [{ translateY: slide }], opacity }}>
        <Text style={{ fontSize: 22, fontWeight: '700' }}>{title}</Text>
        <Text style={{ marginTop: 12 }}>This is a detail screen with a slide + fade animation on mount.</Text>
      </Animated.View>
    </View>
  );
}
