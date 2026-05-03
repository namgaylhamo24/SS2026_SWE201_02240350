import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function Header({ title = 'App' }: { title?: string }) {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current; // for fade in/out of title
  const pan = useRef(new Animated.ValueXY()).current; // for draggable icon
  const progress = useRef(new Animated.Value(0)).current; // for loading bar
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fade in on mount
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();

    // Loading bar loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        Animated.timing(progress, { toValue: 0, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: false })
      ])
    ).start();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    })
  ).current;

  const toggleFade = () => {
    const toValue = visible ? 0 : 1;
    Animated.timing(fadeAnim, { toValue, duration: 400, useNativeDriver: true }).start();
    setVisible(!visible);
  };

  const animatedWidth = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 120] });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.iconWrap, { transform: pan.getTranslateTransform() }]}
      >
        <Ionicons name="school" size={28} color={theme.colors.primary} />
      </Animated.View>

      <TouchableOpacity activeOpacity={0.8} onPress={toggleFade} style={styles.titleWrap}>
        <Animated.Text style={[styles.title, { color: theme.colors.text, opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [6, 0] }) }] }]}>
          {title}
        </Animated.Text>
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: animatedWidth, backgroundColor: theme.colors.primary }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  iconWrap: { marginRight: 12 },
  titleWrap: { flex: 1 },
  title: { fontSize: 20, fontWeight: '700' },
  progressContainer: {
    width: 120,
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 6,
    overflow: 'hidden',
    marginLeft: 12
  },
  progressBar: {
    height: '100%',
    borderRadius: 6
  }
});
