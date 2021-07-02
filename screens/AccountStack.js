import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "./AccountScreen";
const Stack = createStackNavigator();
import { useSelector } from 'react-redux';
import { lightStyles, darkStyles, commonStyles } from "../styles/commonStyles";
import CameraScreen from './CameraScreen';

export default function AccountStack() {

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...isDark ? darkStyles : lightStyles }

  return (
  <Stack.Navigator>
    <Stack.Screen component={AccountScreen} name="Account" options={{
        title: "Your Account",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle
      }} />
      <Stack.Screen component={CameraScreen} name="Camera" options={{
        title: "Your Account",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: styles.headerTint
      }}/>
  </Stack.Navigator>
  )
}
