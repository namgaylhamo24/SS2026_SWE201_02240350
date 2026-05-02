import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
    const navigation: any = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Text style={styles.initials}>NL</Text>
            </View>

            <Text style={styles.name}>Namgay Lhamo</Text>
            <Text style={styles.email}>02240350.cst@rub.edu.bt</Text>

            <View style={styles.infoCard}>
                <Text style={styles.infoText}>Software Engineering Student</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  initials: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  name: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    color: '#0F172A',
  },
  email: {
    marginTop: 6,
    color: '#64748B',
    fontSize: 13,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoText: {
    color: '#475569',
    fontSize: 14,
  },
  button: {
    marginTop: 28,
    backgroundColor: '#6B7280',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfileScreen;
