import React, { useRef, useState, useContext, useCallback } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import ProgressBar from './ProgressBar';
import { Ionicons } from '@expo/vector-icons';
import { sendFile } from '../service/sendFile';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AppContext from '../context/AppContext';
import DataDisplay from './DataDisplay';

export interface ImageProp {
  fullWidth: string;
  cropped: string | null;
}

const useCameraPermission = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const requestCameraPermission = async () => {
    const { status } = await requestPermission();
    return status === 'granted';
  };

  return { permission, requestCameraPermission };
};

const getStepMessage = (step: number) => {
  switch (step) {
    case 1:
      return 'Use natural light/near a window.';
    case 2:
      return 'Use warm light bulb or lamp.';
    case 3:
      return 'Use your flash.';
    case 4:
      return 'Diffused light, through a curtain to minimize shadow';
    case 5:
      return 'Ambient light in a well-lit room';
    default:
      return '';
  }
};

const CameraScreen = () => {
  const { permission, requestCameraPermission } = useCameraPermission();
  const [cameraProps, setCameraProps] = useState({
    facing: 'back',
    flash: 'off',
  });
  const [images, setImages] = useState<ImageProp[]>([]);
  const [currImage, setCurrImage] = useState<ImageProp | null>(null);
  const { setBiomarkersData } = useContext(AppContext);
  const camRef = useRef<Camera>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const navigation = useNavigation();

  if (!permission || !permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button title='Grant Permission' onPress={requestCameraPermission} />
      </View>
    );
  }

  const toggleProperty = (
    prop: keyof typeof cameraProps,
    option1: string,
    option2: string
  ) => {
    setCameraProps((prev) => ({
      ...prev,
      [prop]: prev[prop] === option1 ? option2 : option1,
    }));
  };

  const takePicture = async () => {
    if (camRef.current) {
      try {
        const imgData = await camRef.current.takePictureAsync({ base64: true });
        setCurrImage({ fullWidth: imgData.uri, cropped: null });
      } catch (err) {
        console.error('Error taking picture', err);
      }
    }
  };

  const retakePhoto = () => setCurrImage(null);

  const nextPhoto = async () => {
    if (currImage) {
      await sendFile(currImage, setBiomarkersData);
      // Update images and get the new array immediately
      setImages((prev) => {
        const newImages = [...prev, currImage];
        // Check length of newImages array
        if (newImages.length === 5) {
          navigation.navigate('Success');
        }
        return newImages;
      });
      setCurrImage(null);
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  
  return (
    <View style={styles.container}>
      <ProgressBar currentStep={images.length} totalSteps={5} />
      {!currImage?.fullWidth ? (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing={cameraProps.facing}
            flash={cameraProps.flash}
            ref={camRef}
          />
          <View style={styles.fullHighlightTop}>
            <View style={styles.tipText}>
              <Ionicons name='bulb' color='white' size={20} />
              <Text style={styles.messageText}>
                {getStepMessage(currentStep)}
              </Text>
            </View>
          </View>
          <View style={styles.clearArea}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <View style={styles.fullHighlightBottom}>
            <Text style={styles.flashlightText}>Turn on the flashlight</Text>
            <Ionicons
              name={`${cameraProps.flash === 'off' ? 'flash-off' : 'flash'}`}
              size={25}
              color='white'
              style={styles.flashIcon}
              onPress={() => toggleProperty('flash', 'on', 'off')}
            />
            <TouchableOpacity
              onPress={takePicture}
              style={styles.captureButton}
            >
              <View style={styles.circleOne}>
                <View style={styles.circleTwo}>
                  <View style={styles.circleThree}></View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Image source={{ uri: currImage.fullWidth }} style={styles.camera} />
          <View style={styles.buttonGroup}>
            <Button title='Retake Photo' onPress={retakePhoto} />
            <Button title='Next' onPress={nextPhoto} />
          </View>
        </>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },

  messageText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    lineHeight: 22,
  },

  tipText: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50,
  },

  flashlightText: {
    position: 'absolute',
    top: 20,
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    lineHeight: 22,
  },

  flashIcon: {
    position: 'absolute',
    top: 70,
    textAlign: 'center',
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    lineHeight: 22,
  },

  cameraContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera: {
    flex: 1,
    width: '100%',
  },

  fullHighlightTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '30%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullHighlightBottom: {
    position: 'absolute',
    top: '60%',
    left: 0,
    width: '100%',
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },

  captureButton: {
    position: 'absolute',
    bottom: 40,
  },

  circleOne: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleTwo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleThree: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
  },

  clearArea: {
    position: 'absolute',
    top: '30%',
    width: '100%',
    height: '30%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 0,
  },

  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
  },

  // Positioning each corner
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopColor: 'blue',
    borderLeftColor: 'blue',
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderRightColor: 'blue',
    borderTopColor: 'blue',
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderLeftColor: 'blue',
    borderBottomColor: 'blue',
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderRightColor: 'blue',
    borderBottomColor: 'blue',
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 60,
  },

  responseText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  responseData: {
    fontSize: 16,
    marginBottom: 20,
  },
});
