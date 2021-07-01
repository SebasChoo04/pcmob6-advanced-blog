import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BlogStack from './BlogStack';
import AccountScreen from './AccountScreen';

const Tab = createBottomTabNavigator();

export default function LoggedInStack(){
  return (
      <Tab.Navigator>
        <Tab.Screen name="Blog" component={BlogStack} />
        <Tab.Screen name="Settings" component={AccountScreen} />
      </Tab.Navigator>
  )
}