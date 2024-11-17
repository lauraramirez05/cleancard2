import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';

export default function InstructionsScreen() {
  const test = require('../assets/test.jpeg');
  const photos = require('../assets/undraw_moments_0y20.svg');
  const results = require('../assets/undraw_all_the_data_re_hh4w.svg');
  const lighting = require('../assets/undraw_product_photography_91i2.svg');

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title='Skip'
          color='rgba(30, 144, 255, 1)'
          onPress={() => navigation.navigate('Camera Screen')}
        />
      </View>
      <Swiper showsPagination={true} loop={false}>
        <View style={styles.slide}>
          <Text style={styles.text}>How it works:</Text>
          <Text style={styles.subText}>
            Capture{' '}
            <Text
              style={{ fontWeight: 'bold', color: 'rgba(30, 144, 255, 1)' }}
            >
              5 photos
            </Text>{' '}
            of the device to get your result, each in a{' '}
            <Text
              style={{ fontWeight: '600', textDecorationLine: 'underline' }}
            >
              different lighting{' '}
            </Text>{' '}
            setting.
          </Text>
          <Image source={photos} style={styles.images} />
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Position Test Horizontally</Text>
          <Text style={styles.subText}>
            Make sure to center the test device on the highlighted area of the
            camera.
          </Text>
          <View style={styles.testContainer}>
            <Text style={{ fontSize: 32 }}>✅</Text>
            <Image source={test} style={styles.testImage} />
          </View>
          <View style={styles.testContainer}>
            <Text style={{ fontSize: 32 }}>❌</Text>
            <Image
              source={test}
              style={[styles.testImage, { transform: [{ rotate: '-90deg' }] }]}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Try Different Lighting</Text>
          <Text style={styles.subText}>
            Try using natural light, artifical light and a mix of both.
          </Text>
          <Image source={lighting} style={styles.images} />
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Check Your Results</Text>
          <Text style={styles.subText}>
            Contact your healthcare provider for a better understanding.
          </Text>
          <Image source={results} style={styles.images} />
          <View style={styles.imageContainer}>
            <Ionicons
              name='camera'
              size={25}
              color='white'
              onPress={() => navigation.navigate('Camera Screen')}
            />
          </View>
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 20,
  },
  slide: {
    flex: 0.8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
    lineHeight: 30,
  },
  testImage: {
    width: '30%',
    height: undefined,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  testContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
  },

  images: {
    width: '60%',
    height: undefined,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },

  imageContainer: {
    position: 'absolute',
    bottom: -80,
    right: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    borderRadius: 40,
    marginTop: 30,
  },
});
