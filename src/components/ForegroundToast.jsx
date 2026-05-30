import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import theme from '../styles/theme';

export default function ForegroundToast({ visible, title, body, onHide }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return undefined;
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(3500),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => onHide?.());
    return undefined;
  }, [visible, title, body, opacity, onHide]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.wrap, { opacity }]}>
      <View style={styles.toast}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 52,
    left: 16,
    right: 16,
    zIndex: 100,
  },
  toast: {
    backgroundColor: '#1e1b4b',
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent,
  },
  title: { color: '#fff', fontWeight: '700', fontSize: 15 },
  body: { color: '#e0e7ff', marginTop: 4, fontSize: 13 },
});
