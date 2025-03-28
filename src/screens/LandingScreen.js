import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LandingScreen = ({ navigation }) => {
  useEffect(() => {
    console.log("LandingScreen Loaded!");
  }, []);

  return (
    <LinearGradient
      colors={['#F5F5F5', '#B7F9DE']}
      style={styles.container}
    >
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}><Text style={styles.underline}>Class</Text><Text>Align</Text></Text>
      <Text style={styles.subtitle}><Text> Stay Notified • </Text><Text style={styles.underline}>Stay Aligned</Text></Text>

      {/* Button */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Intro')}
      >
        <Text style={styles.buttonText}>Try <Text style={styles.underline}>Class</Text>Align</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 60,
    width: 225,
    height: 225,
    marginBottom: 0,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Lora-Bold',
    color:'#0D9488',
    marginBottom: 15,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Lora-Medium',
    color:'#006666',
    marginBottom: 40,
  },
  button: {
    marginTop: 140,
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
});

export default LandingScreen;