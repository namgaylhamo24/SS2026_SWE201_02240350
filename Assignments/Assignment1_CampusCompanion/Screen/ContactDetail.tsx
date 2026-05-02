import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Linking,Platform} from 'react-native';
import { useRoute } from '@react-navigation/native';

const ContactDetail: React.FC = () => {
  const route: any = useRoute();

  // Retrieve contact object passed from ContactsScreen
  const contact = route.params?.contact || {
    name: '',
    role: '',
    phone: '',
    email: '',
  };

  // Open the phone dialer with the contact's number
  const handleCall = (phone: string) => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
    });
  };

  // Open the email client with the contact's email
  const handleEmail = (address: string) => {
    const url = `mailto:${address}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
    });
  };

  return (
    // Platform.select used to add extra top padding on iOS for safe area
    <View style={[styles.container, styles.platformPadding]}>

      {/* Avatar circle */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{contact.name.charAt(0)}</Text>
      </View>

      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.role}>{contact.role}</Text>

      {/* Phone row */}
      <View style={styles.row}>
        <Text style={styles.label}>📞 Phone:</Text>
        <TouchableOpacity onPress={() => handleCall(contact.phone)}>
          <Text style={styles.link}>{contact.phone}</Text>
        </TouchableOpacity>
      </View>

      {/* Email row */}
      <View style={styles.row}>
        <Text style={styles.label}>✉️ Email:</Text>
        <TouchableOpacity onPress={() => handleEmail(contact.email)}>
          <Text style={styles.link}>{contact.email}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  // Platform.select for iOS/Android specific top padding
  platformPadding: Platform.select({
    ios: { paddingTop: 48 },
    android: { paddingTop: 16 },
    default: { paddingTop: 16 },
  }),
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 32,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  role: {
    color: '#475569',
    fontSize: 14,
    marginBottom: 28,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  label: {
    width: 100,
    color: '#334155',
    fontWeight: '600',
    fontSize: 14,
  },
  link: {
    color: '#0B69FF',
    fontSize: 14,
  },
});

export default ContactDetail;