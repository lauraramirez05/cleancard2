import * as React from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const logo = require('../assets/cleancard.svg');
  const welcomeImage = require('../assets/undraw_medicine_b-1-ol.svg');

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      {/* Welcome Image Section */}
      <View style={styles.imageContainer}>
        <Image source={welcomeImage} style={styles.image} />
      </View>

      {/* Text and Button Section */}
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.subText}>
          Your partner in early detection and peace of mind
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title='Get Started'
            color='white'
            onPress={() => navigation.navigate('Instructions')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-around',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -80,
  },
  logo: {
    width: '60%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: -80,
  },
  image: {
    width: '80%',
    height: undefined,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  subText: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(80, 117, 198, 1)',
    width: '50%',
    borderRadius: 20,
  },
});
