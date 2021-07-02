import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BlogStack from './BlogStack';
import AccountScreen from './AccountScreen';
import { FontAwesome } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function LoggedInStack() {
  
  const isDark = useSelector((state) => state.accountPrefs.isDark);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Blog') {
            iconName = "comments"
          } else if (route.name === 'Settings') {
            iconName = "cog"
          }
          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: isDark ? "#181818" : "white",
          // borderTopColor: "transparent",
        }
      }}>
        <Tab.Screen name="Blog" component={BlogStack} />
        <Tab.Screen name="Settings" component={AccountScreen} />
      </Tab.Navigator>
  )
}