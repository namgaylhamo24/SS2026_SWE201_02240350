import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const DATA = [
  { id: 'planner', title: 'Planner', desc: 'Create and view your daily study plans with reminders.' },
  { id: 'timers', title: 'Timers', desc: 'Pomodoro-style timers to boost focused study sessions.' },
  { id: 'notes', title: 'Notes', desc: 'Quick notes and checklists for each subject.' }
];

export default function CategoryScreen() {
  const [open, setOpen] = useState<string | null>(null);
  const animatedMap = useRef<Record<string, Animated.Value>>({}).current;
  const { theme } = useTheme();

  // initialize animated values per item
  useEffect(() => {
    DATA.forEach((d) => {
      if (!animatedMap[d.id]) animatedMap[d.id] = new Animated.Value(0);
    });
  }, []);

  const toggle = (id: string) => {
    const currentlyOpen = open === id;
    // close previously open
    if (open && open !== id) {
      Animated.timing(animatedMap[open], { toValue: 0, duration: 220, useNativeDriver: false }).start();
    }

    // toggle selected
    Animated.timing(animatedMap[id], { toValue: currentlyOpen ? 0 : 1, duration: 300, useNativeDriver: false }).start();
    setOpen(currentlyOpen ? null : id);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: theme.colors.background }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12, color: theme.colors.text }}>Categories</Text>

      {DATA.map((d) => {
        const animVal = animatedMap[d.id] || new Animated.Value(0);
        const height = animVal.interpolate({ inputRange: [0, 1], outputRange: [0, 70] });
        const opacity = animVal.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

        return (
          <View key={d.id} style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <TouchableOpacity onPress={() => toggle(d.id)} style={styles.row}>
              <Text style={[styles.title, { color: theme.colors.text }]}>{d.title}</Text>
              <Text style={styles.arrow}>{open === d.id ? '−' : '+'}</Text>
            </TouchableOpacity>

            <Animated.View style={[styles.detail, { height, opacity }]}> 
              <Text style={{ color: theme.colors.muted }}>{d.desc}</Text>
              <View style={{ height: 8 }} />
              <TouchableOpacity style={[styles.cta, { backgroundColor: theme.colors.primary }]} onPress={() => {}}>
                <Text style={{ color: '#fff' }}>Open {d.title}</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, backgroundColor: '#fff', borderRadius: 8, padding: 12, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700' },
  arrow: { fontSize: 20 },
  detail: { marginTop: 10, overflow: 'hidden', paddingTop: 6 },
  cta: { backgroundColor: '#5b8cff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignSelf: 'flex-start' }
});
