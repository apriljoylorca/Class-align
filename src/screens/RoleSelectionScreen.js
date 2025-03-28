import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RoleSelectionScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleProceed = () => {
    if (selectedRole) {
      navigation.navigate('Register', { role: selectedRole });
    }
  };

  return (
    <LinearGradient colors={['#F5F5F5', '#B7F9DE']} style={styles.container}>
      <Text style={styles.title}>Are you a teacher or a student?</Text>
      <Text style={styles.subtitle}>Select an option to get started!</Text>
      
      <View style={styles.roleContainer}>
        <TouchableOpacity 
          style={[styles.roleButton, selectedRole === 'teacher' && styles.selectedRole]}
          onPress={() => setSelectedRole('teacher')}
        >
          <Text style={styles.roleText}>TEACHER</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.roleButton, selectedRole === 'student' && styles.selectedRole]}
          onPress={() => setSelectedRole('student')}
        >
          <Text style={styles.roleText}>STUDENT</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.proceedButton, !selectedRole && styles.disabledButton]}
        onPress={handleProceed}
        disabled={!selectedRole}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 100,
    fontSize: 40,
    fontFamily: 'Lora-Medium',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Lora-Regular',
    alignSelf: 'flex-start',
    marginBottom: 100,
    color: '#8B8A8A',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 140,
  },
  roleButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#72B86E',
    width: '45%',
    alignItems: 'center',
  },
  selectedRole: {
    backgroundColor: '#119292',
  },
  roleText: {
    fontFamily: 'Lora-Bold',
    fontSize: 15,
    color: '#F2EFE3',
  },
  proceedButton: {
    backgroundColor: '#119292',
    padding: 15,
    borderRadius: 25,
    width: '70%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#B9B9B9',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Lora-Regular',
    fontSize: 18,
  },
});

export default RoleSelectionScreen;