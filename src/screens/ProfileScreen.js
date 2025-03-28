import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      }
    };
    
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Landing');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
        </View>
        
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.profilePhotoContainer}>
            <Image
              source={require('../../assets/images/profile1.jpg')}
              style={styles.profilePhoto}
            />
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editButtonText}>Edit User Details</Text>
          </TouchableOpacity>
        </View>
        
        {userData && (
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name:</Text>
              <Text style={styles.infoValue}>{userData.lastName}, {userData.firstName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>School ID:</Text>
              <Text style={styles.infoValue}>{userData.schoolId}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{userData.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Role:</Text>
              <Text style={styles.infoValue}>{userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}</Text>
            </View>
          </View>
        )}
        
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChangePassword')}>
            <Icon name="lock" size={24} color="#03AAAA" />
            <Text style={styles.menuText}>Change Password</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('NotificationPreferences')}>
            <Icon name="notifications" size={24} color="#03AAAA" />
            <Text style={styles.menuText}>Notification Preferences</Text>
          </TouchableOpacity>
          
          {userData?.role === 'teacher' && (
            <>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SubjectsHandled')}>
                <Icon name="book" size={24} color="#03AAAA" />
                <Text style={styles.menuText}>Subjects Handled</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ClassroomManagement')}>
                <Icon name="meeting-room" size={24} color="#03AAAA" />
                <Text style={styles.menuText}>Classroom Management</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('TeachingSchedule')}>
                <Icon name="schedule" size={24} color="#03AAAA" />
                <Text style={styles.menuText}>Teaching Schedule</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
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
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Lora-Bold',
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#4a90e2',
    fontFamily: 'Lora-Regular',
  },
  editButton: {
    backgroundColor: '#0D9488',
    padding: 10,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontFamily: 'Lora-Regular',
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoLabel: {
    fontFamily: 'Quicksand-Regular',
    width: '30%',
  },
  infoValue: {
    fontFamily: 'Quicksand-Regular',
    width: '70%',
  },
  menuSection: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'Lora-Regular',
  },
  logoutButton: {
    backgroundColor: '#4a90e2',
    padding: 16,
    borderRadius: 16,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#fff',
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
  },
});

export default ProfileScreen;