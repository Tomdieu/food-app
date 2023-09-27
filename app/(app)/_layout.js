import React, { useEffect } from "react";
import { Redirect, Tabs, router } from "expo-router";

import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header";
import { TouchableOpacity } from "react-native";

export default function RootLayout() {
  const { loadUserFromStorage, isAuthenticated, logout, user } = useAuth();
  useEffect(() => {
    loadUserFromStorage();
  });

  return (
    <Tabs
      screenOptions={{
        headerTitle: "",
        headerRight: ({ pressColor, pressOpacity, tintColor }) => (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              logout();
              router.replace("");
            }}
          >
            <MaterialIcons name="logout" color={tintColor} size={30} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="food"
        options={{
          headerShown: true,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="fast-food" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="audio"
        options={{
          headerShown: true,
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons name="music-video" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="bmi"
        options={{
          headerShown: true,
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons name="calculate" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="charts"
        options={{
          headerShown: true,
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome name="bar-chart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="forms"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons name="widgets" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <AntDesign name="message1" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
