import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { View, Image, Text, Platform, StyleSheet } from 'react-native';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LandingScreen from '../screens/LandingScreen';
import IntroScreen from '../screens/IntroScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomHeader = () => (
  <View style={styles.headerContainer}>
    <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
    <Text style={styles.appName}><Text style={styles.underline}>Class</Text><Text>Align</Text></Text>
  </View>
);

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#4a90e2',
      tabBarInactiveTintColor: '#95a5a6',
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
        height: Platform.OS === 'ios' ? 90 : 70,
        paddingBottom: Platform.OS === 'ios' ? 25 : 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 5,
      },
      tabBarIconStyle: {
        marginTop: 5,
      },
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen 
      name="Calendar" 
      component={CalendarScreen}
      options={{
        tabBarLabel: 'Schedule',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="calendar-today" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen 
      name="Notifications" 
      component={NotificationScreen}
      options={{
        tabBarLabel: 'Alerts',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="notifications-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator 
      initialRouteName="Landing" 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
          height: 80,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleContainerStyle: {
          left: 5, // This adds the 20px left margin
          justifyContent: 'flex-start',
        },
        headerTitle: () => <CustomHeader />,
        headerTitleAlign: 'left',
        headerBackTitleVisible: false,
        headerBackImage: () => null,
        gestureEnabled: true,
        cardStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  appName: {
    fontSize: 20,
    fontFamily: 'Lora-Bold',
    color:'#0D9488',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default AppNavigator;