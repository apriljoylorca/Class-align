import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  TextInput,
  SafeAreaView
} from 'react-native';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [nextClass, setNextClass] = useState(null);
  const [availableClassrooms, setAvailableClassrooms] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [studentClasses, setStudentClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userQuery = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });

        // Mock data fetching
        setNextClass({
          name: "History Class",
          section: "8 - Section Prosperity",
          time: "09:00 a.m.",
          room: "Room 201"
        });

        setAvailableClassrooms([{
          id: "1",
          name: "Prosperity Classroom",
          location: "Junior High Building - Room 201",
          status: "Available",
          availability: "09:00 AM - 4:00 PM",
          capacity: "30 students",
          equipment: "Projector, Whiteboard",
          image: require('../../assets/images/classroom1.jpg')
        }]);

        setAnnouncements([{
          id: "1",
          from: "Principal Smith",
          to: "All Teachers",
          subject: "Staff Meeting",
          time: "Today at 3:00 PM",
          message: "Reminder about the mandatory staff meeting. It gonna be held at 3:00 pm this afternoon at the conference room.",
          avatar: require('../../assets/images/profile2.jpg')
        }]);

        setTodaySchedule([{
          id: "1",
          subject: "Mathematics",
          class: "Grade 11 - ABM",
          time: "08:00 AM - 09:30 AM",
          type: "Lecture"
        }]);

        setTeacherClasses([{
          id: "1",
          name: "Mathematics 101",
          subject: "Algebra",
          gradeLevel: "Grade 11",
          section: "Section A",
          schedule: "Mon/Wed/Fri 9:00-10:00 AM",
          studentsEnrolled: 25,
          teacher: "Mr. John Smith"
        }]);

        setStudentClasses([{
          id: "1",
          name: "Mathematics in the Modern World",
          subject: "Greneral Mathematics",
          gradeLevel: "Grade 12",
          section: "ABM 1",
          schedule: "Mon/Thu/Fri 9:00-10:00 AM",
          teacher: "Ms. Anne Hathaway"
        }]);
      }
    };

    fetchData();
  }, []);

  const renderAnnouncement = ({ item }) => (
    <View style={styles.announcementCard}>
      <View style={styles.announcementHeader}>
        <Image source={item.avatar} style={styles.announcementAvatar} />
        <View style={styles.announcementHeaderText}>
          <Text style={styles.announcementFrom}>{item.from}</Text>
          <Text style={styles.announcementTo}>To: {item.to}</Text>
        </View>
      </View>
      <Text style={styles.announcementSubject}>{item.subject}</Text>
      <Text style={styles.announcementTime}>{item.time}</Text>
      <Text style={styles.announcementMessage}>{item.message}</Text>
    </View>
  );

  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <View style={styles.scheduleTime}>
        <Text style={styles.scheduleTimeText}>{item.time.split(' - ')[0]}</Text>
        <Text style={styles.scheduleTimeText}>{item.time.split(' - ')[1]}</Text>
      </View>
      <View style={styles.scheduleDetails}>
        <Text style={styles.scheduleSubject}>{item.subject}</Text>
        <Text style={styles.scheduleClass}>{item.class}</Text>
      </View>
    </View>
  );

  const renderTeacherClass = ({ item }) => (
    <View style={styles.teacherClassCard}>
      <View style={styles.classHeader}>
        <Text style={styles.className}>{item.name}</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditClass', { classId: item.id })}
        >
          <Icon name="edit" size={18} color="#03AAAA" />
        </TouchableOpacity>
      </View>
      <Text style={styles.classDetail}>Subject: {item.subject}</Text>
      <Text style={styles.classDetail}>Grade: {item.gradeLevel} - {item.section}</Text>
      <Text style={styles.classDetail}>Schedule: {item.schedule}</Text>
      <Text style={styles.classDetail}>Students: {item.studentsEnrolled}</Text>
    </View>
  );

  const renderStudentClass = ({ item }) => (
    <View style={styles.studentClassCard}>
      <Text style={styles.className}>{item.name}</Text>
      <Text style={styles.classDetail}>Subject: {item.subject}</Text>
      <Text style={styles.classDetail}>Grade: {item.gradeLevel} - {item.section}</Text>
      <Text style={styles.classDetail}>Schedule: {item.schedule}</Text>
      <Text style={styles.classDetail}>Teacher: {item.teacher}</Text>
    </View>
  );

  const currentHour = new Date().getHours();
  let timeGreeting = '';
  
  if (currentHour < 12) {
    timeGreeting = 'Good Morning';
  } else if (currentHour < 18) {
    timeGreeting = 'Good Afternoon';
  } else {
    timeGreeting = 'Good Evening';
  }

  const renderSection = ({ item }) => {
    switch (item.type) {
      case 'profile':
        return (
          <View style={styles.profileSection}>
            <Image
              source={require('../../assets/images/profile1.jpg')}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.greeting}>{timeGreeting},</Text>
              <Text style={styles.userName}>{userData?.firstName} {userData?.lastName}</Text>
              <Text style={styles.userRole}>{userData?.role === 'teacher' ? 'Teacher' : 'Student'}</Text>
            </View>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Icon name="edit" size={18} color="#03AAAA" />
            </TouchableOpacity>
          </View>
        );
      case 'search':
        return userData?.role === 'student' ? (
          <View style={styles.searchSection}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for classes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => navigation.navigate('SearchClasses')}
            />
            <TouchableOpacity 
              style={styles.searchButton}
              onPress={() => navigation.navigate('SearchClasses', { query: searchQuery })}
            >
              <Icon name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : null;
      case 'nextClass':
        return nextClass ? (
          <View style={styles.nextClassContainer}>
            <Text style={styles.sectionTitle}>Next Class</Text>
            <Text style={styles.className}>{nextClass.name}</Text>
            <View style={styles.classDetails}>
              <View style={styles.classDetailItem}>
                <Icon name="class" size={18} color="#fff" />
                <Text style={styles.classDetailText}>{nextClass.section}</Text>
              </View>
              <View style={styles.classDetailItem}>
                <Icon name="schedule" size={18} color="#fff" />
                <Text style={styles.classDetailText}>{nextClass.time}</Text>
              </View>
              <View style={styles.classDetailItem}>
                <Icon name="room" size={18} color="#fff" />
                <Text style={styles.classDetailText}>{nextClass.room}</Text>
              </View>
            </View>
          </View>
        ) : null;
      case 'availableClassrooms':
        return userData?.role === 'teacher' ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Available Classrooms</Text>
              <TouchableOpacity onPress={() => navigation.navigate('BookClassroom')}>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.classroomsContainer}>
              {availableClassrooms.map((classroom) => (
                <View key={classroom.id} style={styles.classroomCard}>
                  <Image source={classroom.image} style={styles.classroomImage} />
                  <View style={styles.classroomInfo}>
                    <Text style={styles.classroomName}>{classroom.name}</Text>
                    <View style={styles.classroomDetailRow}>
                      <Icon name="location-on" size={16} color="#666" />
                      <Text style={styles.classroomDetail}>{classroom.location}</Text>
                    </View>
                    <View style={styles.classroomDetailRow}>
                      <Icon name="access-time" size={16} color="#666" />
                      <Text style={styles.classroomDetail}>{classroom.availability}</Text>
                    </View>
                    <View style={styles.classroomDetailRow}>
                      <Icon name="people" size={16} color="#666" />
                      <Text style={styles.classroomDetail}>{classroom.capacity}</Text>
                    </View>
                    <View style={styles.classroomDetailRow}>
                      <Icon name="devices" size={16} color="#666" />
                      <Text style={styles.classroomDetail}>{classroom.equipment}</Text>
                    </View>
                    <View style={styles.classroomStatus}>
                      <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]} />
                      <Text style={styles.classroomStatusText}>{classroom.status}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookButton}>
                      <Text style={styles.bookButtonText}>Book Now</Text>
                      <Icon name="arrow-forward" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null;
      case 'announcements':
        return (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Announcements</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            {announcements.map((announcement) => (
              <View key={announcement.id}>
                {renderAnnouncement({ item: announcement })}
              </View>
            ))}
          </View>
        );
      case 'schedule':
        return (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Schedule</Text>
            </View>
            {todaySchedule.map((scheduleItem) => (
              <View key={scheduleItem.id}>
                {renderScheduleItem({ item: scheduleItem })}
              </View>
            ))}
          </View>
        );
      case 'classes':
        return userData?.role === 'teacher' ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Classes</Text>
              <TouchableOpacity onPress={() => navigation.navigate('TeacherClasses')}>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            {teacherClasses.slice(0, 4).map((classItem) => (
              <View key={classItem.id}>
                {renderTeacherClass({ item: classItem })}
              </View>
            ))}
          </View>
        ) : userData?.role === 'student' ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Classes</Text>
              <TouchableOpacity onPress={() => navigation.navigate('StudentClasses')}>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            {studentClasses.slice(0, 4).map((classItem) => (
              <View key={classItem.id}>
                {renderStudentClass({ item: classItem })}
              </View>
            ))}
          </View>
        ) : null;
      case 'createClass':
        return userData?.role === 'teacher' ? (
          <TouchableOpacity 
            style={styles.createClassButton}
            onPress={() => navigation.navigate('CreateClass')}
          >
            <Icon name="add" size={24} color="#fff" />
            <Text style={styles.createClassButtonText}>Create a Class</Text>
          </TouchableOpacity>
        ) : null;
      default:
        return null;
    }
  };

  const getTeacherSections = () => [
    { id: '1', type: 'profile' },
    { id: '2', type: 'nextClass' },
    { id: '3', type: 'availableClassrooms' },
    { id: '4', type: 'announcements' },
    { id: '5', type: 'schedule' },
    { id: '6', type: 'classes' },
    { id: '7', type: 'createClass' },
  ];

  const getStudentSections = () => [
    { id: '1', type: 'profile' },
    { id: '2', type: 'search' },
    { id: '3', type: 'nextClass' },
    { id: '4', type: 'announcements' },
    { id: '5', type: 'schedule' },
    { id: '6', type: 'classes' },
  ];

  const sections = userData?.role === 'teacher' ? getTeacherSections() : getStudentSections();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
        bounces={true}
        overScrollMode="always"
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        alwaysBounceVertical={true}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        removeClippedSubviews={true}
      >
        {sections.map((section) => (
          <View key={section.id}>
            {renderSection({ item: section })}
          </View>
        ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#03AAAA',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Lora-Regular',
  },
  userName: {
    fontSize: 22,
    fontFamily: 'Lora-SemiBold',
    color: '#333',
    marginTop: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#006666',
    fontFamily: 'Lora-Medium',
    marginTop: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF4FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchButton: {
    backgroundColor: '#03AAAA',
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextClassContainer: {
    backgroundColor: '#59CE8B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Lora-SemiBold',
    color: '#006666',
  },
  className: {
    fontSize: 18,
    fontFamily: 'Lora-Medium',
    color: '#0',
    marginBottom: 12,
  },
  classDetails: {
    marginTop: 8,
  },
  classDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  classDetailText: {
    fontSize: 14,
    fontFamily: 'Lora-Regular',
    color: '#fff',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAll: {
    color: '#4a90e2',
    fontSize: 14,
    fontFamily: 'Lora-Medium',
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  announcementHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  announcementAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  announcementHeaderText: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  announcementFrom: {
    fontSize: 14,
    fontFamily: 'Lora-Medium',
    color: '#333',
  },
  announcementTo: {
    fontSize: 12,
    fontFamily: 'Quicksand-Regular',
    color: '#666',
  },
  announcementSubject: {
    fontSize: 16,
    fontFamily: 'Lora-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  announcementTime: {
    fontSize: 12,
    fontFamily: 'Quicksand-Regular',
    color: '#999',
    marginBottom: 8,
  },
  announcementMessage: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    color: '#555',
    lineHeight: 20,
  },
  scheduleItem: {
    backgroundColor: '#FFE4C4',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  teacherClassCard: {
    backgroundColor: '#E6E6FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  studentClassCard: {
    backgroundColor: '#E0FFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  editButton: {
    padding: 4,
  },
  scheduleTime: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
    paddingRight: 12,
    marginRight: 12,
  },
  scheduleTimeText: {
    fontSize: 13,
    fontFamily: 'Quicksand-Medium',
    color: '#666',
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleSubject: {
    fontSize: 16,
    fontFamily: 'Lora-Medium',
    color: '#333',
    marginBottom: 4,
  },
  scheduleClass: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    color: '#666',
    marginBottom: 8,
  },
  createClassButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  createClassButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lora-SemiBold',
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 30,
  },
  classDetail: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    color: '#555',
    marginBottom: 4,
  },
  classroomsContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  classroomCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  classroomImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  classroomInfo: {
    padding: 16,
  },
  classroomName: {
    fontSize: 18,
    fontFamily: 'Lora-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  classroomDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  classroomDetail: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  classroomStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  classroomStatusText: {
    fontSize: 14,
    fontFamily: 'Quicksand-Medium',
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#03AAAA',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lora-SemiBold',
    marginRight: 8,
  },
});

export default HomeScreen;