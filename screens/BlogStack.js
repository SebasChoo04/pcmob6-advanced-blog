import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from './IndexScreen';
import CreateScreen from './CreateScreen';
import EditScreen from './EditScreen';

const InnerStack = createStackNavigator();
export default function BlogStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen name="Index" component={IndexScreen} options={{
        title: "Blog",
        headerStyle: {
          backgroundColor: "yellow",
          height: 100,
          shadowColor: "black",
          shadowOpacity: 0.2,
          shadowRadius: 5,
        },
        headerTintColor: "#f55",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
        }
      }}/>
      <InnerStack.Screen name="Add" component={CreateScreen} />
      <InnerStack.Screen name="Edit" component={EditScreen}/>
    </InnerStack.Navigator>
  )
}