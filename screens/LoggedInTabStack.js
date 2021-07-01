import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexScreen from './IndexScreen';
import AccountScreen from './AccountScreen';

const Tab = createBottomTabNavigator();

export default function LoggedInStack(){
  return (
      <Tab.Navigator>
        <Tab.Screen name="Blog" component={IndexScreen} />
        <Tab.Screen name="Settings" component={AccountScreen} />
      </Tab.Navigator>
  )
}