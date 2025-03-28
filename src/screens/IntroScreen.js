import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const IntroScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#F5F5F5', '#B7F9DE']} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/image1.png')} style={[styles.image, styles.image1]} />
        <Image source={require('../../assets/images/image2.png')} style={[styles.image, styles.image2]} />
        <Image source={require('../../assets/images/image3.png')} style={[styles.image, styles.image3]} />
        <Image source={require('../../assets/images/image4.png')} style={[styles.image, styles.image4]} />
        <Image source={require('../../assets/images/image5.png')} style={[styles.image, styles.image5]} />
      </View>

      <Text style={styles.title}>
        <Text style={styles.underline}>Class</Text><Text>Align</Text>
      </Text>
      
      <Text style={styles.description}>
        "Effortlessly manage class schedules, track room availability, and streamline updates—all in one intuitive app. Stay organized with AI-powered scheduling and smart notifications for a seamless school experience."
      </Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('RoleSelection')}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    position: 'absolute',
    top: 80,
    width: '100%',
    height: 150,
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  image1: { top: -10, left: -10, transform: [{ rotate: '-15deg' }] },
  image2: { top: 170, right: -10, transform: [{ rotate: '10deg' }] },
  image3: { top: 140, left: 30, transform: [{ rotate: '20deg' }] },
  image4: { top: 80, right: 100, transform: [{ rotate: '-5deg' }] },
  image5: { top: 0, right: -18, transform: [{ rotate: '5deg' }] },

  title: {
    marginTop: 320,
    fontFamily: 'Lora-Medium',
    color:'#0D9488',
    fontSize: 36,
    marginBottom: 20,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Quicksand-Regular',
    marginBottom: 100,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#119292',
    padding: 15,
    borderRadius: 25,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FCF1C4',
    fontFamily: 'Lora-Regular',
    fontSize: 18,
  },
  loginText: {
    marginTop: 35,
    fontFamily: 'Lora-Medium',
    fontSize: 14,
    textAlign: 'center',
    color: '#0D9488',
  },
});

export default IntroScreen;