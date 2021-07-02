import React, { useState, useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, Text, View, Switch, Image } from "react-native";
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

  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
    getUsername();
    console.log(profilePicture)
    return removeListener;
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignInSignUp");
  }

  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      <Text style={[styles.title, styles.text, { marginTop: 30 }]}> Hello {username} !</Text>
      <View style={{ marginTop: 20 }}>
        { profilePicture != null ?
          <View>
            <Image source={{ uri: profilePicture.uri }} style={{ width: 250, height: 250, borderRadius: 200 }} />
            <TouchableOpacity onPress={deletePhoto}>
              <Text style={{ fontSize: 20, color: "#0000EE", marginTop: 10 }}> Delete and retake photo? </Text>  
            </TouchableOpacity>
          </View>:
          <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            <Text style={{ fontSize: 20, color: "#0000EE" }}> No profile picture. Click to take one. </Text>
          </TouchableOpacity>
        }
      </View>
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
