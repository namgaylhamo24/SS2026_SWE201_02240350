

import React from 'react';
import {View,Text,StyleSheet,ScrollView,Dimensions} from 'react-native';

// Get screen width for responsive card sizing
const { width } = Dimensions.get('window');

// Weekly timetable data
const WEEK = [
  {
    day: 'Monday',
    classes: [
      { subject: 'Cryptology', time: '9:00 - 10:00', room: 'Room IT-06' },
      { subject: 'Operating System', time: '11:00 - 12:00', room: 'Room IT-06' },
    ],
  },
  {
    day: 'Tuesday',
    classes: [
      { subject: 'SWE201', time: '10:00 - 11:00', room: 'Room IT-06' },
    ],
  },
  {
    day: 'Wednesday',
    classes: [
      { subject: 'Programming Lab', time: '14:00 - 16:00', room: 'Lab 1' },
    ],
  },
  {
    day: 'Thursday',
    classes: [
      { subject: 'DevOps', time: '9:00 - 10:30', room: 'Room IT-06' },
    ],
  },
  {
    day: 'Friday',
    classes: [
      { subject: 'SDA202', time: '13:00 - 14:00', room: 'Room IT-06' },
    ],
  },
];

const ScheduleScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Weekly Timetable</Text>

      {/* Render a card for each day */}
      {WEEK.map((dayItem) => (
        <View key={dayItem.day} style={[styles.card, { width: width - 32 }]}>
          <Text style={styles.day}>{dayItem.day}</Text>

          {/* Render each class in the day */}
          {dayItem.classes.map((cls, index) => (
            <View key={index} style={styles.classRow}>
              <View style={styles.classIndicator} />
              <View style={styles.classInfo}>
                <Text style={styles.subject}>{cls.subject}</Text>
                <Text style={styles.classDetail}>{cls.time} · {cls.room}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#0F172A',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  // Day name heading inside card
  day: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 10,
  },
  classRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  // Colored left indicator bar for each class
  classIndicator: {
    width: 4,
    height: '100%',
    minHeight: 36,
    backgroundColor: '#93C5FD',
    borderRadius: 2,
    marginRight: 10,
  },
  classInfo: {
    flex: 1,
  },
  subject: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  classDetail: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});

export default ScheduleScreen;