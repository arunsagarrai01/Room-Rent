import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const AVATAR_SIZE = width * 0.35; // 35% of screen width
const MENU_ICON_SIZE = 48;

export default function ProfileScreen({ navigation }) {
  const user = {
    name: 'Kiran Bhandari',
    email: 'Kiran.bhandari@gmail.com',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQFYxLZBm7Klcg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708185341383?e=1753920000&v=beta&t=OjVKaq-NitNejkmtvMqEgr7An6qtRPCCNA0FNNZu2ho',
    joinDate: 'March 2025'
  };

  const menuItems = [
    { icon: 'person-outline', title: 'Personal Information', screen: 'PersonalInfo' },
    { icon: 'card-outline', title: 'Payment Methods', screen: 'PaymentMethods' },
    { icon: 'notifications-outline', title: 'Notifications', screen: 'Notifications' },
    { icon: 'shield-outline', title: 'Privacy & Security', screen: 'Privacy' },
    { icon: 'help-circle-outline', title: 'Help & Support', screen: 'Support' },
    { icon: 'settings-outline', title: 'Settings', screen: 'Settings' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user.avatar }} 
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <View style={styles.joinDateContainer}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.joinDate}>Member since {user.joinDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem
              ]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon} size={24} color="#000" />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: width * 0.03,
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingTop: width * 0.02,
    paddingBottom: width * 0.03,
    paddingHorizontal: width * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: width * 0.02,
  },
  headerTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#fff',
    padding: width * 0.05,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#fff',
    padding: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: width * 0.05,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: AVATAR_SIZE / 2 - 3,
    borderWidth: 2,
    borderColor: '#000',
  },
  userInfo: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: width * 0.05,
  },
  name: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: width * 0.03,
    textAlign: 'center',
  },
  joinDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.02,
    borderRadius: 20,
  },
  joinDate: {
    fontSize: width * 0.035,
    color: '#666',
    marginLeft: 6,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: width * 0.05,
    marginVertical: width * 0.05,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: MENU_ICON_SIZE,
    height: MENU_ICON_SIZE,
    borderRadius: MENU_ICON_SIZE / 2,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  menuItemText: {
    fontSize: width * 0.04,
    color: '#000',
    fontWeight: '500',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    marginHorizontal: width * 0.05,
    marginBottom: width * 0.08,
    padding: width * 0.04,
    borderRadius: 12,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 