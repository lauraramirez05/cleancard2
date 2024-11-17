// In App.js in a new project

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import HomeScreen from './components/HomeScreen';
// import InstructionsScreen from './components/DetailsScreen';
import InstructionsScreen from './components/InstructionsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './components/CameraScreen';
import ResultsInfo from './components/ResultsInfo';
import DataDisplay from './components/DataDisplay';
import { AppProvider } from './context/AppContext';

const Stack = createNativeStackNavigator();

function RootStack() {
  const logo = require('./assets/cleancard.svg');
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen
        name='Instructions'
        component={InstructionsScreen}
        options={{
          headerTitle: () => (
            <Image
              source={logo} // Use the logo variable directly
              style={styles.logo}
            />
          ),
        }}
      />
      <Stack.Screen name='Camera Screen' component={CameraScreen} />
      <Stack.Screen
        name='Success'
        component={ResultsInfo}
        options={{
          headerTitle: () => <Image source={logo} style={styles.logo} />,
        }}
      />
      <Stack.Screen
        name='Results'
        component={DataDisplay}
        options={{
          headerTitle: () => (
            <Image
              source={logo} // Use the logo variable directly
              style={styles.logo}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 40, // Adjust size according to your logo
    resizeMode: 'contain',
  },
});
