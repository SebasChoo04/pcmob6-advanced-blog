import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from './IndexScreen';
import CreateScreen from './CreateScreen';
import EditScreen from './EditScreen';
import ShowScreen from './DetailsScreen';
import { useSelector } from 'react-redux';
import { darkStyles, lightStyles } from '../styles/commonStyles';

const InnerStack = createStackNavigator();

export default function BlogStack() {
  
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles
  const headerOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: styles.headerTint
  }

  return (
    <InnerStack.Navigator>
      <InnerStack.Screen name="Index" component={IndexScreen} options={{ title: "Blog", ...headerOptions }} />
      <InnerStack.Screen name="Add" component={CreateScreen} options={{ title: "Add Post", ...headerOptions }} />
      <InnerStack.Screen name="Details" component={ShowScreen} options={headerOptions} />
      <InnerStack.Screen name="Edit" component={EditScreen} options={{ title: "Edit Post", ...headerOptions }} />
    </InnerStack.Navigator>
  )
}