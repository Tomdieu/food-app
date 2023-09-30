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
        <TouchableOpacity style={{}}>
          <MaterialCommunityIcons name="file" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={{}}>
          <MaterialCommunityIcons name="image" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={{}}>
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
    paddingHorizontal: 0,
    paddingVertical: 2,
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
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  textInput: {
    fontSize: 16,
    height: 50,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#007AFF",
    borderRadius: 2,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
