import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View, Switch } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, API_WHOAMI } from "../constants/API";
import { useSelector, useDispatch } from "react-redux";
import { lightModeAction, darkModeAction } from "../redux/ducks/accountPref";

export default function AccountScreen({ navigation }) {

  const [username, setUsername] = useState("");
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const dispatch = useDispatch();

  function switchMode() {
    isDark ? dispatch(lightModeAction()) : dispatch(darkModeAction())
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

    return removeListener;
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignInSignUp");
  }

  return (
    <View style={commonStyles.container}>
      <Text>Account Screen</Text>
      <Text>{username}</Text>
      <Text> Dark Mode? </Text>
      <Switch
        value={isDark}
        onChange={switchMode}
      />
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}
