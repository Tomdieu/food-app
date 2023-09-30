import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const MenuScreen = () => {
  return (
    <View>
      <Text
        style={{
          fontWeight: "700",
          marginVertical: 10,
          fontSize: 30,
          paddingHorizontal: 8,
        }}
      >
        Menu
      </Text>
      <View style={{ gap: 5, paddingHorizontal: 8 }}>
        <CustomButton
          style={{ justifyContent: "space-between" }}
          leftIcon={
            <AntDesign name="profile" size={16} style={{ color: "#fff" }} />
          }
          rightIcon={<AntDesign name="caretright" size={24} color="#fff" />}
          title="Update Profile"
          onPress={() => router.push("/update_profile")}
        />
        <CustomButton
          title="Add Food"
          onPress={() => router.push("/add_food")}
        />
        <CustomButton
          title="Add Health Status"
          onPress={() => router.push("/add_health_status")}
        />
        <CustomButton
          title="Dashboard"
          onPress={() => router.push("/dashboard")}
        />
      </View>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({});
