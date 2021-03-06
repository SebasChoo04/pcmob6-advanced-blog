import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import LoggedInTabStack from "./screens/LoggedInTabStack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInSignUp from "./screens/SignInSignUpScreen";
import { Provider } from "react-redux";
import store from "./redux/configureStore";

const Stack = createStackNavigator();

 function App() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        headerMode="none"
        initialRouteName={signedIn ? "Logged In" : "SignInSignUp"}
      >
        <Stack.Screen component={LoggedInTabStack} name="Logged In" />
        <Stack.Screen component={SignInSignUp} name="SignInSignUp" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store} >
      <App/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
