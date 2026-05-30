import React from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';
import theme from '../styles/theme';

export default function NotificationToggle({ value, onValueChange, disabled, label }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label ?? 'Notifications'}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: { fontSize: 15, color: '#111827', fontWeight: '600' },
});
