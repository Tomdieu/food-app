import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Ingredient {
  id: number;
  name: string;
}

export interface Food {
  id: number;
  name: string;
  calories: number;
  description: string;
  image: string;
  ingredients: Ingredient[];
}

interface FoodStoreState {
  foods: Food[];
  addFood: (food: Food) => void;
  removeFood: (foodId: number) => void;
  loadFoods: () => void;
}

const useFoodStore = create<FoodStoreState>((set, get) => ({
  foods: [],
  addFood: async (food) => {
    set((state) => ({ foods: [...state.foods, food] }));

    // Save the updated foods array to AsyncStorage
    try {
      await AsyncStorage.setItem("foods", JSON.stringify(get().foods));
    } catch (error) {
      console.error("Error saving foods to AsyncStorage:", error);
    }
  },
  removeFood: async (foodId) => {
    set((state) => ({
      foods: state.foods.filter((food) => food.id !== foodId),
    }));

    // Save the updated foods array to AsyncStorage
    try {
      await AsyncStorage.setItem("foods", JSON.stringify(get().foods));
    } catch (error) {
      console.error("Error saving foods to AsyncStorage:", error);
    }
  },
  loadFoods: async () => {
    try {
      const storedFoods = await AsyncStorage.getItem("foods");
      if (storedFoods) {
        set({ foods: JSON.parse(storedFoods) });
      }
    } catch (error) {
      console.error("Error loading foods from AsyncStorage:", error);
    }
  },
}));

// useFoodStore.getState().loadFoods();

export default useFoodStore;
