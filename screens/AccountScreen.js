import React, { useState, useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, StyleSheet, Text, View, Switch } from "react-native";
import { lightStyles, darkStyles, commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, API_WHOAMI } from "../constants/API";
import { useSelector, useDispatch } from "react-redux";
import { lightModeAction, darkModeAction } from "../redux/ducks/accountPref";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function AccountStack() {

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...isDark ? darkStyles : lightStyles }

  return (
  <Stack.Navigator>
    <Stack.Screen component={AccountScreen} name="AccountStack" options={{
        title: "Your Account",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle
      }}/>
  </Stack.Navigator>
  )
}

function AccountScreen({ navigation }) {

  const [username, setUsername] = useState("");
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const dispatch = useDispatch();
  const styles = { ...isDark ? darkStyles : lightStyles, ...commonStyles }

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
    <View style={[styles.container, { alignItems: "center" }]}>
      <Text style={[styles.title, styles.text, { marginTop: 30 }]}> Hello {username} !</Text>
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
