import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useGlobalSearchParams, useNavigation } from "expo-router";
import useFoodStore, { Food } from "../../../hooks/useFood";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const FoodDetail = () => {
  const { id } = useGlobalSearchParams();
  const { loadFoods, foods, removeFood } = useFoodStore();
  const { setOptions } = useNavigation();
  const [food, setFood] = useState<Food>(null);

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {
    const findedFood = foods.find((_food) => _food.id === Number(id));
    setFood(findedFood);
    if (findedFood) {
      setOptions({ headerTitle: findedFood.name });
    }
  }, [id]);

  const alertUserForDeletion = () => {
    Alert.alert("Confirm", `Do you really want to delete this ${food.name} ?`, [
      { text: "No", style: "destructive" },
      {
        text: "Yes",
        onPress: () => {
          removeFood(id);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {!food ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={styles.foodContainer}>
          <Image style={styles.foodImage} source={{ uri: food.image }} />
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>Name: {food.name}</Text>
            <Text style={styles.foodCalories}>
              Calories: {food.calories} Cal/KJ
            </Text>
            <Text style={styles.foodDescription}>
              Description: {food.description}
            </Text>
            <Text style={styles.ingredientsTitle}>Ingredients:</Text>
            <View style={styles.ingredientsList}>
              {food.ingredients.map((ingredient) => (
                <Text key={ingredient.id} style={styles.ingredientItem}>
                  {ingredient.name}
                </Text>
              ))}
            </View>
          </View>
          <View
            style={{ position: "absolute", zIndex: 99, bottom: 5, left: 5 }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: "blue",
                padding: 15,
                borderRadius: 50,
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
              }}
            >
              <View>
                <AntDesign name="back" color={"#fff"} size={24} />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{ position: "absolute", zIndex: 99, bottom: 5, right: 5 }}
          >
            <TouchableOpacity
              onPress={alertUserForDeletion}
              style={{
                backgroundColor: "red",
                padding: 15,
                borderRadius: 50,
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
              }}
            >
              <View>
                <MaterialIcons name="delete" color={"#fff"} size={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  foodContainer: {
    flex: 1,
    padding: 16,
  },
  foodImage: {
    width: "100%",
    height: 200,
    resizeMode: "stretch",
  },
  foodInfo: {
    marginTop: 16,
  },
  foodName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  foodCalories: {
    fontSize: 16,
    marginTop: 8,
  },
  foodDescription: {
    fontSize: 16,
    marginTop: 8,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  ingredientsList: {
    marginTop: 8,
  },
  ingredientItem: {
    fontSize: 14,
    marginBottom: 4,
  },
});
