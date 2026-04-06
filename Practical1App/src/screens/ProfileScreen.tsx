import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen: React.FC = () => {
    return (    
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <Text style={styles.text}>This is the profile screen.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#7afff6",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default ProfileScreen;
