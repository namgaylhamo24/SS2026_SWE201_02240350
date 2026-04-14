import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,FlatList,Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Get screen width for responsive sizing
const { width } = Dimensions.get('window');

// List of important campus contacts
const CONTACTS = [
  { id: '1', name: 'IT Helpdesk', role: 'Technical Support', phone: '+975-5-362341', email: 'it@cst.rub.edu.bt' },
  { id: '2', name: 'Student Services', role: 'Student Affairs', phone: '+975-5-362342', email: 'services@cst.rub.edu.bt' },
  { id: '3', name: 'Library', role: 'Library & Resources', phone: '+975-5-362343', email: 'library@cst.rub.edu.bt' },
  { id: '4', name: 'Security', role: 'Campus Security', phone: '+975-5-362344', email: 'security@cst.rub.edu.bt' },
  { id: '5', name: 'Admin Office', role: 'Administration', phone: '+975-5-362345', email: 'admin@cst.rub.edu.bt' },
];

const ContactsScreen: React.FC = () => {
  const navigation: any = useNavigation();

  // Render each contact card in the FlatList
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ContactDetail', { contact: item })}
    >
      {/* Avatar circle with first letter of name */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Important Contacts</Text>
      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0F172A',
  },
  listContent: {
    paddingBottom: 24,
  },
  // Each contact row card
  item: {
    width: width - 32,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Circular avatar with initial letter
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  itemInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  role: {
    marginTop: 2,
    color: '#6B7280',
    fontSize: 13,
  },
  arrow: {
    fontSize: 22,
    color: '#CBD5E1',
    fontWeight: '300',
  },
});

export default ContactsScreen;