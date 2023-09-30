import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import usePersonStore from "../../hooks/useApp";

const DashboardScreen = () => {
  const { loadPersonData, person } = usePersonStore();
  // use 
  console.log(person);
  return (
    <View>
      <Text>Dahboard</Text>
      <View style={{ paddingHorizontal: 5 }}>
        <Text>Foods</Text>
        {person.foods.map((food) => {
          return (
            <View
              style={{
                padding: 8,
                backgroundColor: "#cccc",
                borderColor: "#dddd",
                marginVertical: 8,
                borderRadius: 5,
              }}
            >
              <Text>Nom {food.name}</Text>
              <Text>Date {food.date}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
