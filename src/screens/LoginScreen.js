import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <LinearGradient colors={['#F5F5F5', '#B7F9DE']} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.subheader}>Sign in and start your seamless learning journey.</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 36,
    fontFamily: 'Lora-Bold',
    marginBottom: 2,
    marginTop: 100,
  },
  subheader: {
    fontSize: 18,
    fontFamily: 'Lora-Medium',
    color: '#8B8A8A',
    marginBottom: 50,
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
    marginTop: 8,
  },
  forgotPassword: {
    color: '#0D9488',
    textAlign: 'right',
    marginBottom: 20,
    fontFamily: 'Lora-Medium',
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#119292',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Lora-Regular',
    fontSize: 16,
  },
  registerText: {
    fontFamily: 'Lora-Medium',
    fontSize: 14,
    textAlign: 'center',
    color: '#0D9488',
    textAlign: 'center',
    marginTop: 160,
  },
});

export default LoginScreen;