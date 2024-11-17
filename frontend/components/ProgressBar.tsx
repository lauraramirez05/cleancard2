import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressBar({ currentStep, totalSteps }) {
  const circles = Array.from({ length: totalSteps }, (_, index) => index);

  return (
    <View style={styles.progressBar}>
      {circles.map((step, index) => (
        <View key={index} style={styles.circleContainer}>
          {index < currentStep ? (
            // Show checkmark icon for completed steps
            <Ionicons name='checkmark-circle' size={25} color='green' />
          ) : (
            // Show grey circle for incomplete steps
            <View style={[styles.circle, styles.incomplete]} />
          )}
          {index < totalSteps - 1 && (
            <View
              style={[
                styles.line,
                index < currentStep - 1 ? styles.completedLine : null,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#dcdcdc',
  },
  completed: {
    backgroundColor: '#4caf50', // Green for completed
  },
  incomplete: {
    backgroundColor: '#dcdcdc', // Light gray for incomplete
  },
  line: {
    width: 40,
    height: 8, // Increased line height for better visibility
    backgroundColor: '#dcdcdc',
    marginTop: 2, // Reduced margin between circle and line for closer positioning
  },
  completedLine: {
    backgroundColor: '#4caf50', // Green for completed line
  },
});
