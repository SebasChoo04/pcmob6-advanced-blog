import React, { useState, useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, Text, View, Switch, Animated, TouchableWithoutFeedback } from "react-native";
import { lightStyles, darkStyles, commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, API_WHOAMI } from "../constants/API";
import { useSelector, useDispatch } from "react-redux";
import { LIGHT_ACTION, DARK_ACTION, DELETE_PIC_ACTION } from "../redux/ducks/accountPref";

export default function AccountScreen({ navigation }) {

  const [username, setUsername] = useState(null);

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const profilePicture = useSelector((state) => state.accountPrefs.profilePicture);
  const size = new Animated.Value(0);
  const sizeInterpolation = {
    inputRange: [0, 0.5, 1],
    outputRange: [200, 300, 200]
  }
  const dispatch = useDispatch();
  const styles = { ...isDark ? darkStyles : lightStyles, ...commonStyles }

  function switchMode() {
    isDark ? dispatch({ type: LIGHT_ACTION }) : dispatch({ type: DARK_ACTION });
  }

  function deletePhoto(){
    dispatch({ type: DELETE_PIC_ACTION });
    navigation.navigate("Camera")
  }

  async function getUsername() {
    console.log("---- Getting user name ----");
    const token = await AsyncStorage.getItem("token");
    console.log(`Token is ${token}`);
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      setUsername(response.data.username);
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401) {
          signOut();
          navigation.navigate("SignInSignUp")
        }
      } else {
        console.log(error);
      }
      // We should probably go back to the login screen???
    }
  }

  function animatePicSize() {
    Animated.loop(
      Animated.timing(size, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false
      })).start();
  }

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignInSignUp");
  }

  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
    getUsername();
    return removeListener;
  }, []);

  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      <Text style={[styles.title, styles.text, { marginTop: 30 }]}> Hello {username} !</Text>
        {profilePicture != null ?
            <View style={{ marginTop: 20, height: 325, alignItems: "center", justifyContent: "center" }}>
              <TouchableWithoutFeedback onPress={animatePicSize}>
                <Animated.Image
                  source={{ uri: profilePicture.uri }}
                  style={{
                    width: size.interpolate(sizeInterpolation),
                    height: size.interpolate(sizeInterpolation),
                    borderRadius: 200,
                  }} />
              </TouchableWithoutFeedback>
          </View> : <View />
        }
      <TouchableOpacity onPress={() => profilePicture == null ? navigation.navigate("Camera") : deletePhoto()}>
          <Text style={{ marginTop: 10, fontSize: 20, color: "#0000EE" }}> { profilePicture == null ? "No profile picture. Click to take one." : "Delete and retake" } </Text>
          </TouchableOpacity>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 20}}>
        <Text style={[styles.content, styles.text]}> Dark Mode? </Text>
        <Switch
          value={isDark}
          onChange={switchMode}
        />
      </View>
      <TouchableOpacity style={[styles.button,]} onPress={signOut}>
        <Text style={styles.buttonText}>
          Sign Out
        </Text>
        </TouchableOpacity>
    </View>
  );
}
