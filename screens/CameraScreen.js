import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useSelector } from 'react-redux';
import { darkStyles, lightStyles } from '../styles/commonStyles';
import { FontAwesome } from '@expo/vector-icons';

export default function CameraScreen({ navigation }) {

  const [hasPermission, setHasPermission] = useState(null); 
  const [back, setBack] = useState(true)

  const cameraRef = useRef(null)
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;

  async function showCamera() {
    const {status} = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
    if (hasPermission === false) {
      Alert.alert("Error: No access given")
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={flip}>
          <FontAwesome name="refresh" size={24} style={{ color: styles.headerTint, marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    showCamera()
  }, [])

  function flip() {
    setBack(!back);
  }

  async function takePicture() {
    const photo = await cameraRef.current.takePictureAsync()
    // console.log(photo)
    console.log(photo)
    
    navigation.navigate("Photo", {image: photo})
  }

  return (
    <View style={{flex: 1}}>
      <Camera style={additionalStyles.camera} type={back ? Camera.Constants.Type.back : Camera.Constants.Type.front} ref={cameraRef}>
        <View style={additionalStyles.innerView}>
          <View style={additionalStyles.buttonView}>
            <TouchableOpacity onPress={() => takePicture()} style={[additionalStyles.circleButton, { backgroundColor: isDark ? "black" : "white" }]}/>
          </View>
        </View>
      </Camera>
    </View>
  )
}

  const additionalStyles = StyleSheet.create({
    camera: {
      flex: 1,
    },
      circle: {
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    circleButton: {
      width: 70,
      height: 70,
      bottom: 0,
      borderRadius: 50,
    },
    buttonView: {
      alignSelf: 'center',
      flex: 1,
      alignItems: 'center'
    },
    innerView: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'space-between'
    }
  })