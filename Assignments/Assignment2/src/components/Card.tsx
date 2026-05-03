import React, { useRef } from 'react';
import { Text, View, StyleSheet, Animated, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type Props = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  progress?: number;
};

export default function Card({ title, subtitle = 'Tap to open', onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const { theme } = useTheme();

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.975, useNativeDriver: true, friction: 7 }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} accessibilityRole="button">
      <Animated.View style={[styles.container, { transform: [{ scale }], backgroundColor: theme.colors.card }]}> 
        <View style={styles.row}>
          <Ionicons name="reader" size={20} color={theme.colors.primary} style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: theme.colors.muted }]}>{subtitle}</Text>
            {/* simple static progress hint (can be extended to prop-driven) */}
            <View style={styles.progressWrap}>
              <View style={styles.progressTrack} />
              <View style={[styles.progressFill, { width: '36%', backgroundColor: theme.colors.primary }]} />
            </View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { marginTop: 6 },
  progressWrap: { marginTop: 10, height: 6, width: '60%', position: 'relative' },
  progressTrack: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: '#eef5ff', borderRadius: 6 },
  progressFill: { position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: 6 }
});
