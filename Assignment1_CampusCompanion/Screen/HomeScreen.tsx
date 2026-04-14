import React, { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,Platform,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation: any = useNavigation();

  // State to toggle between light and dark theme
  const [dark, setDark] = useState(false);

  // Dynamic container style based on dark mode state
  const dynamicContainer = dark ? styles.containerDark : styles.containerLight;

  // Dynamic text style based on dark mode state
  const dynamicText = dark ? styles.textDark : styles.textLight;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={[styles.container, dynamicContainer]}>

        {/* College logo using Image component */}
        <Image
          source={require('../assets/image.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={[styles.header, dynamicText]}>Campus Companion</Text>
        <Text style={[styles.subheader, dynamicText]}>
          College of Science and Technology
        </Text>

        {/* Info card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome, Student!</Text>
          <Text style={styles.cardText}>
            Access contacts, schedule, and notices all in one place.
          </Text>
        </View>

        {/* Navigation buttons to other screens */}
        <TouchableOpacity
          style={[styles.button, styles.buttonPlatform]}
          onPress={() => navigation.navigate('Contacts')}
        >
          <Text style={styles.buttonText}>📋 Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Schedule')}
        >
          <Text style={styles.buttonText}>📅 Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NoticeBoard')}
        >
          <Text style={styles.buttonText}>📌 Notice Board</Text>
        </TouchableOpacity>

        {/* Dark/Light theme toggle button */}
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => setDark(!dark)}
        >
          <Text style={styles.toggleText}>
            {dark ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ScrollView content container
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  // Light theme background
  containerLight: {
    backgroundColor: '#F6F8FA',
  },
  // Dark theme background
  containerDark: {
    backgroundColor: '#0F172A',
  },
  // Light theme text
  textLight: {
    color: '#0F172A',
  },
  // Dark theme text
  textDark: {
    color: '#FFFFFF',
  },
  // College logo image
  logo: {
    width: 80,
    height: 80,
    marginTop: 24,
    marginBottom: 12,
    borderRadius: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 8,
  },
  subheader: {
    fontSize: 13,
    marginTop: 4,
    color: '#475569',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  cardText: {
    marginTop: 6,
    color: '#64748B',
    fontSize: 13,
  },
  button: {
    marginTop: 14,
    width: '100%',
    backgroundColor: '#334155',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
  },
  // Platform-specific button style using Platform.select
  buttonPlatform: Platform.select({
    ios: {
      backgroundColor: '#1E40AF',
    },
    android: {
      backgroundColor: '#374151',
    },
    default: {
      backgroundColor: '#334155',
    },
  }),
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  toggle: {
    marginTop: 20,
    backgroundColor: '#0B69FF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  toggleText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default HomeScreen;