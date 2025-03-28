import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  
  const role = route.params?.role || 'student';

  const educationLevels = [
    'Elementary School',
    'Junior High School',
    'Senior High School',
    'College – BS in Hospitality Management',
    'College – BS in Information Technology',
    'College – BS in Secondary Education Major in Mathematics',
    'College – BS in Secondary Education Major in Science',
    'College – BS in Secondary Education Major in English',
    'College – BS in Secondary Education Major in Physical Education',
    'College – BS in Elementary Education',
    'College – BS in Entrepreneurship'
  ];

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }

    if (role === 'student' && !educationLevel) {
      Alert.alert("Error", "Please select your educational level");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userData = {
        firstName,
        lastName,
        schoolId,
        email,
        role,
        createdAt: new Date(),
      };

      if (educationLevel) {
        userData.educationLevel = educationLevel;
      }
      
      await setDoc(doc(db, "users", user.uid), userData);
      
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <LinearGradient colors={['#F5F5F5', '#B7F9DE']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>New Account</Text>
        <Text style={styles.subheader}>Sign Up and get started</Text>
        
        <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
        <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
        <TextInput style={styles.input} placeholder="School ID" value={schoolId} onChangeText={setSchoolId} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
        
        {role === 'student' && (
          <>
            <Text style={styles.label}>Education Level:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={educationLevel}
                style={styles.picker}
                onValueChange={(itemValue) => setEducationLevel(itemValue)}
              >
                <Picker.Item label="Select your educational level" value="" />
                {educationLevels.map((level, index) => (
                  <Picker.Item key={index} label={level} value={level} />
                ))}
              </Picker>
            </View>
          </>
        )}
        
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontFamily: 'Lora-Bold',
    marginBottom: 2,
    marginTop: 30,
  },
  subheader: {
    fontSize: 18,
    fontFamily: 'Lora-Medium',
    color: '#8B8A8A',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#069494',
    backgroundColor: '#F1F1F1',
    fontFamily: 'Quicksand-Medium',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Quicksand-Medium',
    marginBottom: 5,
    color: '#8B8A8A',
  },
  pickerContainer: {
    borderColor: '#069494',
    backgroundColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  registerButton: {
    backgroundColor: '#119292',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Lora-Regular',
    fontSize: 18,
  },
  loginText: {
    marginTop: 80,
    fontFamily: 'Lora-Medium',
    fontSize: 14,
    textAlign: 'center',
    color: '#0D9488',
  },
});

export default RegisterScreen;