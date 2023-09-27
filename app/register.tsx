import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { STATUS_BAR_HEIGHT } from "../constants";
import CustomButton from "../components/CustomButton";
import useAuth from "../hooks/useAuth";
import { router } from "expo-router";

const RegisterScreen = () => {
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const handleLogin = () => {
    register({ ...formData, id: Math.random() * 10000 });
    // You can add your authentication logic here, like API calls and validation
    // If authentication is successful, you can navigate to the next screen
    router.push("/food");
  };

  return (
    <SafeAreaView
      style={{
        marginTop: STATUS_BAR_HEIGHT,
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 5,
      }}
    >
      <View>
        <Text style={styles.header}>Register To Food App</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          value={formData.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          value={formData.password}
        />
        <CustomButton
          title="Register"
          style={{ marginVertical: 5 }}
          onPress={handleLogin}
          disabled={Boolean(!formData.name) || Boolean(!formData.password)}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Already have an account ? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={{ fontWeight: "800" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
