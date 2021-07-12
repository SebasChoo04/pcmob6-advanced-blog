import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";

export default function ShowScreen({ navigation, route }) {

  const [post, setPost] = useState(route.params.post);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = {...isDark ? darkStyles : lightStyles, ...commonStyles};

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={editPost} style={{marginRight: 10}}>
          <FontAwesome name="pencil-square-o" size={30} color={styles.headerTint} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    console.log(route.params.post)
  }, [])

  function editPost() {
    navigation.navigate("Edit")
  }
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text, { margin: 40 }]}>{post.title}</Text>
      <Text style={[styles.content, styles.text, { margin: 20 }]}>{post.text}</Text>
    </View>
  );
}
