import React, { useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native"; // Import Dimensions
import { BarChart } from "react-native-chart-kit";
import useFoodStore from "../../hooks/useFood";
import { STATUS_BAR_HEIGHT } from "../../constants";

const ChartComponent = () => {
  const { foods, loadFoods } = useFoodStore();
  useEffect(() => {
    loadFoods();
  }, []);
  const data = {
    labels: foods.map((food) => food.name),
    datasets: [
      {
        data: foods.map((food) => food.calories), // Replace with your calorie values
      },
    ],
  };
  return (
    <View style={styles.container}>
      {foods.length > 0 ? (
        <Text>{foods.length} Foods</Text>
      ) : (
        <Text>No Food added </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    paddingHorizontal: 5,
  },
});

export default ChartComponent;
