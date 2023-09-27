import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const ChatInputForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="file" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="image" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="video" size={24} color="#555" />
        </TouchableOpacity>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          multiline={true}
          numberOfLines={2}
        />
      </View>
      <TouchableOpacity style={styles.sendButton}>
        <MaterialCommunityIcons name="send" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInputForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: 2,
  },
  iconButton: {
    marginRight: 2,
  },
  textInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  textInput: {
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#007AFF",
    borderRadius: 16,
    padding: 8,
  },
});
