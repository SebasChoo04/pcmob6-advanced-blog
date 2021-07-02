import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API, API_POSTS } from "../constants/API";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IndexScreen({ navigation, route }) {

  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addPost}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "#f55",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      getPosts();
    });
    getPosts();
    return removeListener;
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    const response = await getPosts()
    setRefreshing(false);
  }

  async function getPosts() {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.get(API + API_POSTS, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response.data);
      setPosts(response.data);
      return "completed"
    } catch (error) {
      console.log(error.response.data);
    }
  }

  function addPost() {
    navigation.push("Add");
  }

  async function deletePost(id) {
    const token = await AsyncStorage.getItem("token");
    console.log("Deleting " + id);
    try {
      const response = await axios.delete(API + API_POSTS + `/${id}`, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response);
      setPosts(posts.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error)
    }
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Details", {post: item})}>
        <View
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text>{item.title}</Text>
          <TouchableOpacity onPress={() => deletePost(item.id)}>
            <Ionicons name="trash" size={18} color="#944" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl
          colors={["#9Bd35A", "#689F38"]}
          refreshing={refreshing}
          onRefresh={onRefresh}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
});
