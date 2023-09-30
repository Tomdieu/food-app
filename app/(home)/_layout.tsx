import { Stack, Tabs, router } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import { STATUS_BAR_HEIGHT } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

export default function HomeLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerTitle: "Food App",
          headerTitleAlign: "center",
          headerRight: ({ tintColor }) => (
            <TouchableOpacity
              onPress={() => router.replace("/")}
              style={{
                marginRight: 20,
              }}
            >
              <Text>Sign Out</Text>
              {/* <AntDesign name="logout" size={12} /> */}
            </TouchableOpacity>
          ),
        }}
      />
    </SafeAreaView>
  );
}
