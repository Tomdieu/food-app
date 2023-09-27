import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import useChats, { Discussion } from "../../../hooks/useChat";
import ChatInputForm from "../../../components/chat/InputForm";
import { getRandomUser } from "../../../constants";

const ChatDetail = () => {
  const { id } = useGlobalSearchParams();
  const { chats } = useChats();
  const { setOptions } = useNavigation();
  const [chat, setChat] = useState<Discussion>();

  useEffect(() => {
    const chat = chats.find((chat) => chat.id === Number(id));
    setChat(chat);
    setOptions({ headerTitle: getRandomUser(chat) });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={chat?.messages}
        renderItem={({ item: message }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.sender}>@{message.sender.name}</Text>
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        )}
      />
      <ChatInputForm />
    </View>
  );
};

export default ChatDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    backgroundColor: "#EFEFEF",
    padding: 12,
    borderRadius: 8,
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
  },
});
