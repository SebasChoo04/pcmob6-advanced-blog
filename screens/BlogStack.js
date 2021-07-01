import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from './IndexScreen';
import CreateScreen from './CreateScreen';
import EditScreen from './EditScreen'
const InnerStack = createStackNavigator();
export default function BlogStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen name="Index" component={IndexScreen} />
      <InnerStack.Screen name="Add" component={CreateScreen} />
      <InnerStack.Screen name="Edit" component={EditScreen}/>
    </InnerStack.Navigator>
  )
}