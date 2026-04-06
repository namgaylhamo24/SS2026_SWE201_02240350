import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <Text style={styles.subheader}>Let's get started.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hi there!</Text>
        <Text style={styles.cardText}>A simple demo of multi-screen navigation </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
    padding: 24,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 24,
  },
  subheader: {
    marginTop: 6,
    color: '#475569',
    fontSize: 14,
  },
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  cardText: {
    marginTop: 8,
    color: '#64748B',
    fontSize: 13,
  },
  button: {
    marginTop: 28,
    backgroundColor:'#6B7280',
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

export default HomeScreen;