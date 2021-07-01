import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ShowScreen({ navigation, route }) {

  const [post, setPost] = useState(route.params.post);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={editPost} style={{marginRight: 10}}>
          <FontAwesome
            name="pencil-square-o"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    console.log(route.params.post)
  }, [])

  function editPost() {
    
  }
  
  return (
    <View>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.text}</Text>
      {//change text to content when making slides
      }
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30, 
    textAlign: 'center',
    marginTop: 20, 
  },
  content: {
    fontWeight: '400',
    fontSize: 24, 
    marginTop: 30,
    marginLeft: 20, 
    marginRight: 20,
  },
  author: {
    fontWeight: '200',
    fontSize: 15, 
    marginTop: 30,
    marginLeft: 20, 
    marginRight: 20,
  }
});