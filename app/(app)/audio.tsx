import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from "react-native";
import React from "react";
import { STATUS_BAR_HEIGHT } from "../../constants";

const AudioScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: STATUS_BAR_HEIGHT }}>
      <StatusBar />
      <Text>AudioScreen</Text>
    </SafeAreaView>
  );
};

export default AudioScreen;

const styles = StyleSheet.create({});
