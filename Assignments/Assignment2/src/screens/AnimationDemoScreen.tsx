import React, { useRef } from 'react';
import { View, Text, Animated, PanResponder, StyleSheet } from 'react-native';

export default function AnimationDemoScreen() {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.spring(scale, { toValue: 1.1, useNativeDriver: true }).start();
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: () => {
      Animated.parallel([
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true })
      ]).start();
    }
  });

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Animation Demo</Text>
      <Text style={{ marginBottom: 12 }}>Drag the circle — it's gesture-driven and animated.</Text>
      <View style={styles.playArea}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[pan.getLayout(), { transform: [{ scale }], ...styles.circle }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#5b8cff' }
});
