import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import BMICalculator from "../../components/bmi";

const bmi = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <StatusBar />
      <BMICalculator />
    </SafeAreaView>
  );
};

export default bmi;

const styles = StyleSheet.create({});
