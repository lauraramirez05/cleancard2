import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppContext from '../context/AppContext';

export default function DataDisplay() {
  const { biomarkersData } = useContext(AppContext);
  const numColumns = biomarkersData[0].length;

  const result = [];

  for (let col = 0; col < numColumns; col++) {
    const columnValues = biomarkersData.map((row) => row[col]);

    const min = Math.min(...columnValues);
    const max = Math.max(...columnValues);
    const mean =
      columnValues.reduce((sum, value) => sum + value, 0) / columnValues.length;

    result.push({ min, max, mean });
  }

  return (
    <ScrollView contentContainerStyle={styles.chartContainer}>
      {result.map((data, index) => (
        <View key={index} style={styles.barContainer}>
          <Text style={styles.subtitle}>Level {index}:</Text>
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
            />
            {/* Mean Circle */}
            <View
              style={[
                styles.circle,
                { left: `${data.mean * 100}%`, backgroundColor: 'blue' },
              ]}
            >
              {/* Mean Value Bubble */}
              <Text style={styles.bubble}>{data.mean.toFixed(3)}</Text>
            </View>
          </View>
          <View style={styles.labels}>
            <Text>0</Text>
            <Text>1</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },

  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  barContainer: {
    marginVertical: 10,
    width: '80%',
  },
  bar: {
    width: '100%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
    position: 'relative',
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, //
    shadowOpacity: 0.4,
    shadowRadius: 6,

    // Android shadow property
    elevation: 5,
  },
  line: {
    position: 'absolute',
    top: 0,
    width: 2,
    height: '100%',
  },
  circle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 12,
    height: 12,
    borderRadius: 6,
    transform: [{ translateX: -6 }, { translateY: -6 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    position: 'absolute',
    top: -30,
    left: '-50%',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    minWidth: 40,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
});
