import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { STATUS_BAR_HEIGHT, getRandomUser } from "../../../constants";
import useChats from "../../../hooks/useChat";
import Avatar from "../../../assets/avatar.png";
import { router } from "expo-router";

const ChatsScreen = () => {
  const { chats, loadChats } = useChats();
  useEffect(() => {
    loadChats();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, marginTop: STATUS_BAR_HEIGHT }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "800",
          marginVertical: 8,
          paddingHorizontal: 5,
        }}
      >
        Discussions
      </Text>
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => router.push(`/chats/${item.id}`)}>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 6,
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                }}
              >
                <Image
                  source={Avatar}
                  style={{ width: 64, height: 64, borderRadius: 16 }}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>
                    {getRandomUser(item).name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
