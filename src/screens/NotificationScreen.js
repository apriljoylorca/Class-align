import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchNotifications();
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserRole(doc.data().role);
      });
    }
  };

  const fetchNotifications = async () => {
    // Implement logic to fetch notifications from Firestore
    // This is a placeholder - adjust based on your Firestore structure
    const mockNotifications = [
      {
        id: '1',
        type: 'announcement',
        subject: 'Project Submission',
        recipient: 'BSIT 3B Students',
        date: 'Yesterday at 08:00 p.m.',
        received: '45/45 Students',
        read: true,
      },
      {
        id: '2',
        type: 'update',
        subject: 'Class Time Reschedule',
        recipient: 'BSIT 3A Students',
        date: 'February 26, 2025 at 08:00 a.m.',
        received: '38/40 Students',
        read: true,
      },
      {
        id: '3',
        type: 'update',
        subject: 'Class Cancellation',
        recipient: 'BSIT 3B Students',
        date: 'February 25, 2025 at 08:00 a.m.',
        received: '45/45 Students',
        read: true,
      },
    ];
    setNotifications(mockNotifications);
  };

  const renderNotificationItem = ({ item }) => (
    <View style={[styles.notificationCard, !item.read && styles.unreadNotification]}>
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationType}>
          {item.type === 'announcement' ? 'Announcement' : 'Update'}
        </Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
      <Text style={styles.notificationSubject}>Subject: {item.subject}</Text>
      <Text style={styles.notificationText}>Recipient: {item.recipient}</Text>
      {item.received && <Text style={styles.notificationText}>Received by: {item.received}</Text>}
    </View>
  );

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {userRole === 'teacher' && (
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateAnnouncement')}
          >
            <Icon name="add" size={24} color="#fff" />
            <Text style={styles.createButtonText}>Create Announcement</Text>
          </TouchableOpacity>
        )}
        
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
          scrollEnabled={false} // Disable scrolling since we're using ScrollView
          ListEmptyComponent={
            <Text style={styles.emptyText}>No notifications yet</Text>
          }
          ListFooterComponent={
            <Text style={styles.noMoreText}>No more updates</Text>
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#DA4A4A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Lora-Medium',
    marginLeft: 10,
  },
  notificationCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  unreadNotification: {
    backgroundColor: '#e6f2ff',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  notificationType: {
    fontFamily: 'Quicksand-Regular',
    color: '#4a90e2',
  },
  notificationDate: {
    fontFamily: 'Quicksand-Regular',
    color: '#666',
  },
  notificationSubject: {
    fontFamily: 'Quicksand-Regular',
    marginBottom: 5,
  },
  notificationText: {
    fontFamily: 'Quicksand-Regular',
  },
  emptyText: {
    fontFamily: 'Lora-Italic',
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  noMoreText: {
    fontFamily: 'Lora-Italic',
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
  },
});

export default NotificationScreen;