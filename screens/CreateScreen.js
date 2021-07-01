import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";
import { API, API_CREATE } from "../constants/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateScreen({ navigation }) {

  const [title , setTitle] = useState('')
  const [content, setContent] = useState('')

  async function savePost() {
    const post = {
      "text": content, //Change text to content when making slides
      "title": title,
      "author": null
    }
    const token = await AsyncStorage.getItem("token");
    try {
      console.log(token);
      const response = await axios.post(API + API_CREATE, post, {
        headers: { Authorization: `JWT ${token}` }
      });
      console.log(response.data)
      navigation.navigate("Index", {post: post})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
        <Text style={[styles.label, {marginTop: 20}]}>Enter Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <Text style={styles.label}>Enter Content:</Text>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={text => setContent(text)}
        />
        <Button
          title="Save Blog Post"
          onPress={savePost}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5
  }
});