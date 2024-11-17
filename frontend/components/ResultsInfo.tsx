import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

export default function ResultsInfo() {
  const navigation = useNavigation();

  const data = {
    min: 0.2,
    max: 0.8,
    mean: 0.5,
  };

  // Block going back when on this screen
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Disables the back button
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          style={styles.icon}
          name='checkmark-circle'
          size={120}
          color='rgba(11, 156, 49, 0.7)'
        />

        <Text style={styles.title}>Success!</Text>
      </View>
      <View style={styles.testContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Understand Your Results:</Text>
          <Text style={styles.subText}>
            The bar displays a summary of biomarker levels captured across the
            images you provided
          </Text>
        </View>
        <View style={styles.barContainer}>
          <View style={styles.bar}>
            {/* Min Line */}
            <View
              style={[
                styles.line,
                { left: `${data.min * 100}%`, backgroundColor: 'purple' },
              ]}
            />

            {/* Max Line */}
            <View
              style={[
                styles.line,
                { left: `${data.max * 100}%`, backgroundColor: 'purple' },
              ]}
            ></View>
            {/* Mean Circle */}
            <View
              style={[
                styles.circle,
                { left: `${data.mean * 100}%`, backgroundColor: 'blue' },
              ]}
            >
              <Text style={styles.bubble}>{data.mean.toFixed(3)}</Text>
            </View>
          </View>
          <View style={styles.labels}>
            <Text>0</Text>
            <Text>Min</Text>
            <Text>Mean</Text>
            <Text>Max</Text>
            <Text>1</Text>
          </View>
        </View>
      </View>
      <Swiper showsPagination={true} loop={false}>
        <View style={styles.slide}>
          <View style={styles.textContainer}>
            <Text style={styles.slideTitle}>Range:</Text>
            <Text style={styles.slideText}>
              Indicates the Minimum and Maximum of the biomarker
            </Text>
          </View>

          <View style={[styles.barContainer]}>
            <View style={styles.bar}></View>
            <View style={styles.labels}>
              <Text>0</Text>
              <Text>1</Text>
            </View>
          </View>
        </View>
        <View style={styles.slide}>
          <View style={styles.textContainer}>
            <Text style={styles.slideTitle}>Spread:</Text>
            <Text style={styles.slideText}>
              The purple markers represent variation in biomarker levels
              detected
            </Text>
          </View>

          <View style={styles.barContainer}>
            <View style={styles.bar}>
              <View
                style={[
                  styles.highlight,
                  {
                    left: `${data.min * 100}%`, // Position the highlight starting from min
                    width: `${(data.max - data.min) * 100}%`, // Width of the highlight is the difference between max and min
                  },
                ]}
              />
              <View
                style={[
                  styles.line,
                  { left: `${data.min * 100}%`, backgroundColor: 'purple' },
                ]}
              />

              {/* Max Line */}
              <View
                style={[
                  styles.line,
                  { left: `${data.max * 100}%`, backgroundColor: 'purple' },
                ]}
              />
            </View>
            <View style={styles.labels}>
              <Text>0</Text>
              <Text>1</Text>
            </View>
          </View>
        </View>
        <View style={styles.slide}>
          <View style={styles.textContainer}>
            <Text style={styles.slideTitle}>Mean:</Text>
            <Text style={styles.slideText}>
              Gives you an idea of the typical biomarker level
            </Text>
          </View>

          <View style={styles.barContainer}>
            <View style={styles.bar}>
              <View
                style={[
                  styles.circle,
                  { left: `${data.mean * 100}%`, backgroundColor: 'blue' },
                ]}
              >
                <Text style={styles.bubble}>{data.mean.toFixed(3)}</Text>
              </View>
            </View>
            <View style={styles.labels}>
              <Text>0</Text>
              <Text>1</Text>
            </View>
          </View>
        </View>
      </Swiper>
      <View style={styles.buttonContainer}>
        <Button
          title='See Results'
          color='white'
          onPress={() => navigation.navigate('Results')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '98%',
    margin: 5,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  testContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },

  subText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'left',
  },
  barContainer: {
    marginVertical: 10,
    paddingHorizontal: 30,
    width: '100%',
  },
  bar: {
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
    position: 'relative', // Ensures absolute positioning of elements
    // iOS shadow properties
    shadowColor: '#000', // Black shadow
    shadowOffset: { width: 0, height: 4 }, // Adjust the shadow's position
    shadowOpacity: 0.4, // Adjust the transparency of the shadow
    shadowRadius: 6, // Adjust the blur radius of the shadow

    // Android shadow property
    elevation: 5, // Controls the shadow depth on Android
  },
  line: {
    position: 'absolute',
    top: 0,
    width: 2, // Line thickness
    height: '100%', // Full height of the bar
  },
  circle: {
    position: 'absolute',
    top: '50%', // Vertically center the circle
    left: '50%',
    width: 12, // Circle size
    height: 12,
    borderRadius: 6, // To make it a circle
    transform: [{ translateX: -6 }, { translateY: -6 }], // Center the circle horizontally and vertically
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    position: 'absolute',
    top: -30, // Position above the circle
    left: '-50%', // Center the bubble horizontally over the circle
    backgroundColor: 'white',
    paddingVertical: 5, // Increase vertical padding for better height
    paddingHorizontal: 10, // Increase horizontal padding for more width
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    minWidth: 40, // Minimum width for the bubble (increase if needed)
  },
  labels: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },

  slide: {
    paddingVertical: 10,
    paddingLeft: 10,
    // borderWidth: 2,
    borderRadius: 10,

    // iOS shadow properties
    shadowColor: '#000', // Black shadow
    shadowOffset: { width: 0, height: 4 }, // Adjust the shadow's position
    shadowOpacity: 0.1, // Adjust the transparency of the shadow
    shadowRadius: 6, // Adjust the blur radius of the shadow

    // Android shadow property
    elevation: 5, // Controls the shadow depth on Android
  },

  slideTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 7,
  },

  slideText: {
    fontSize: 16,
    color: '#555',
  },
  // paginationStyle: {
  //   // borderWidth: 2,
  //   position: 'absolute',
  //   bottom: 90, // Adjust this value to control how close the pagination is to the bottom
  //   left: 0,
  //   right: 0,
  //   paddingBottom: 10, // You can add extra space if needed
  // },
  textContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(220, 208, 255, 0.3)', // Adjust the color to your preference
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(80, 117, 198, 1)',
    width: '50%', // Adjust width as needed
    borderRadius: 20,
    alignSelf: 'center', // Centers the button horizontally within its parent container
  },
});
