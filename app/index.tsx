import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  StatusBar,
} from "react-native";
import useFoodStore from "../hooks/useFood";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
import FoodAndFruits from "../assets/fruits.jpg";

const App = () => {
  const { foods } = useFoodStore();
  return (
    <ImageBackground
      source={FoodAndFruits}
      style={styles.backgroundImage}
      resizeMode="stretch"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome To Food Agenda</Text>
          <Text style={styles.subtitle}>Save the food you eat</Text>
        </View>
        <CustomButton
          onPress={() => router.push("/food")}
          title={"Get Started"}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background
    padding: 16,
  },
  textContainer: {
    // alignItems: "center",
    marginBottom: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default App;
