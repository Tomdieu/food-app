import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import useFoodStore, { Food } from "../../../hooks/useFood";
import CustomButton from "../../../components/CustomButton";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { STATUS_BAR_HEIGHT } from "../../../constants";
import useAuth from "../../../hooks/useAuth";

const FoodScreen = () => {
  const { foods, removeFood } = useFoodStore();
  const renderItem = ({ item }: { item: Food }) => (
    <View style={styles.foodItem}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => router.push(`/food/${item.id}`)}
      >
        {item.image && (
          <Image style={styles.foodImage} source={{ uri: item.image }} />
        )}
        <View style={styles.foodDetails}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text>Calories: {item.calories}</Text>
          <Text>Description: {item.description}</Text>
          <Text>Ingredients:</Text>

          <FlatList
            style={{ flexDirection: "row" }}
            data={item.ingredients}
            renderItem={({ item }) => (
              <Text style={styles.ingredient}>{item.name}</Text>
            )}
            keyExtractor={(ingredient) => ingredient.id.toString()}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFood(item.id)}
      >
        <AntDesign
          name="delete"
          color={"#fff"}
          size={16}
          style={{ fontWeight: "bold" }}
        />
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text
        style={{
          fontWeight: "700",
          marginHorizontal: 8,
          fontSize: 30,
          marginBottom: 8,
        }}
      ></Text>
      {foods.length == 0 ? (
        <View style={styles.noFoodsContainer}>
          <Text style={styles.noFoodsText}>Oops! No Food Added Yet</Text>
        </View>
      ) : (
        <FlatList
          data={foods}
          renderItem={renderItem}
          keyExtractor={(food) => food.id.toString()}
        />
      )}
      <View style={styles.addButtonContainer}>
        <CustomButton
          title={"Add a Food"}
          onPress={() => router.push("/food/add_food")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },
  foodItem: {
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    elevation: 2, // Add elevation for shadow (Android)
    shadowColor: "black", // Color of the shadow (iOS)
    shadowOffset: { width: 0, height: 2 }, // Offset of the shadow (iOS)
    shadowOpacity: 0.3, // Opacity of the shadow (iOS)
  },
  foodImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  foodDetails: {
    borderTopColor: "#ddd",
    borderTopWidth: 2,
    paddingTop: 10,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ingredient: {
    marginLeft: 5,
    padding: 9,
    paddingHorizontal: 15,
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 20,
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 5,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "#df3434e0",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  noFoodsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noFoodsText: {
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
  },
  addButtonContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    paddingBottom: 5,
  },
});

export default FoodScreen;
