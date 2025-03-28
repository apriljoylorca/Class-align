import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [schedules, setSchedules] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('student'); // Default to student

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, fetch user role from your auth system
        // For demo, we'll use a mock value - replace with actual implementation
        // const user = auth.currentUser;
        // const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', user.uid)));
        // setUserRole(userDoc.data().role || 'student');
        
        // Mock user role for demonstration
        setUserRole('teacher'); // Set to teacher for teacher view
        
        await Promise.all([fetchSchedules(), fetchClassrooms()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const fetchSchedules = async () => {
    try {
      const mockSchedules = [
        {
          id: '1',
          subject: 'History',
          class: 'Grade 8 - Prosperity',
          teacher: 'Mr. John Smith',
          schedule: 'Mon/Wed 09:00 a.m. - 10:30 a.m.',
          date: moment().format('YYYY-MM-DD'),
        },
        {
          id: '2',
          subject: 'Mathematics',
          class: 'Grade 12 - STEM 1',
          teacher: 'Ms. Anne Hathaway',
          schedule: 'Tue/Thu 10:30 a.m. - 12:00 p.m.',
          date: moment().add(1, 'day').format('YYYY-MM-DD'),
        },
      ];
      
      setSchedules(mockSchedules);
      
      const marked = {};
      mockSchedules.forEach(schedule => {
        marked[schedule.date] = { 
          marked: true, 
          dotColor: '#4a90e2',
          selectedDotColor: '#ffffff'
        };
      });
      setMarkedDates(marked);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const fetchClassrooms = async () => {
    try {
      const mockClassrooms = [
        {
          id: '1',
          name: 'Grade 08 - Prosperity',
          location: 'Junior High School Building',
          status: 'Available',
          availability: '09:00 a.m. - 10:30 a.m.',
        },
        {
          id: '2',
          name: 'Grade 12 - STEM 2',
          location: 'Second Floor, Main Building',
          status: 'Reserved for Grade 12 STEM 2',
          timeOccupied: '07:30 a.m. - 05:00 p.m.',
          availability: '05:00 p.m. - 08:00 p.m.',
        },
        {
          id: '3',
          name: 'Science Lab 1',
          location: 'Science Wing',
          status: 'Available',
          availability: '11:00 a.m. - 03:00 p.m.',
        },
      ];
      setClassrooms(mockClassrooms);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleCard}>
      <Text style={styles.scheduleSubject}>{item.subject} - {item.class}</Text>
      <Text style={styles.scheduleText}>{item.schedule}</Text>
      {item.teacher && <Text style={styles.scheduleText}>Teacher: {item.teacher}</Text>}
    </View>
  );

  const renderClassroomItem = ({ item }) => (
    <View style={styles.classroomCard}>
      <View style={styles.classroomHeader}>
        <Text style={styles.classroomName}>{item.name}</Text>
        {userRole === 'teacher' && (
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => navigation.navigate('RoomBooking', { classroom: item })}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
            <Icon name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.classroomDetail}>Location: {item.location}</Text>
      <Text style={[
        styles.classroomDetail, 
        item.status.includes('Available') ? styles.availableText : styles.reservedText
      ]}>
        Status: {item.status}
      </Text>
      {item.timeOccupied && <Text style={styles.classroomDetail}>Time Occupied: {item.timeOccupied}</Text>}
      <Text style={styles.classroomDetail}>Availability: {item.availability}</Text>
      {userRole === 'student' && (
        <Text style={styles.infoText}>Only teachers can book classrooms</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: { 
            selected: true, 
            selectedColor: '#03AAAA',
            selectedTextColor: '#ffffff'
          }
        }}
        theme={{
          calendarBackground: '#ffffff',
          selectedDayBackgroundColor: '#03AAAA',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#03AAAA',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#03AAAA',
          selectedDotColor: '#ffffff',
          arrowColor: '#03AAAA',
          monthTextColor: '#03AAAA',
          textDayFontFamily: 'Lora-Regular',
          textMonthFontFamily: 'Lora-Regular',
          textDayHeaderFontFamily: 'Lora-Regular',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
      
      <Text style={styles.sectionTitle}>Today's Schedule</Text>
      <FlatList
        data={schedules.filter(s => s.date === selectedDate)}
        renderItem={renderScheduleItem}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No classes scheduled for this day</Text>
        }
      />
      
      <Text style={styles.sectionTitle}>Classrooms</Text>
      {userRole === 'student' && (
        <Text style={styles.infoBanner}>Viewing available classrooms (booking restricted to teachers)</Text>
      )}
      <FlatList
        data={classrooms}
        renderItem={renderClassroomItem}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Lora-Regular',
    fontSize: 16,
    color: '#03AAAA',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Lora-SemiBold',
    marginTop: 20,
    marginBottom: 10,
    color: '#006666',
  },
  scheduleCard: {
    backgroundColor: '#F0CE87',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  scheduleSubject: {
    fontFamily: 'Lora-Medium',
    marginBottom: 8,
    color: '#333',
    fontSize: 16,
  },
  scheduleText: {
    fontFamily: 'Quicksand-Regular',
    color: '#666',
    marginBottom: 4,
    fontSize: 14,
  },
  classroomCard: {
    backgroundColor: '#E0FFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  classroomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  classroomName: {
    fontFamily: 'Lora-Medium',
    fontSize: 16,
    color: '#333',
  },
  classroomDetail: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  editButton: {
    padding: 4,
  },
  emptyText: {
    fontFamily: 'Lora-Italic',
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 13,
  },
  availableText: {
    color: '#4CAF50',
  },
  reservedText: {
    color: '#F44336',
  },
  infoText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 12,
    color: '#03AAAA',
    marginTop: 8,
    fontStyle: 'italic',
  },
  infoBanner: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 14,
    color: '#006666',
    backgroundColor: '#E0FFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'center',
  },
  bookButton: {
    backgroundColor: '#03AAAA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Lora-Medium',
    marginRight: 8,
  },
});

export default CalendarScreen;