import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleAlign: "center" }}>
      <Stack.Screen name="foods" options={{ headerShown: false }} />
      <Stack.Screen
        name="add_food"
        options={{ headerTitle: "Add Food", presentation: "modal" }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Food Detail",
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
