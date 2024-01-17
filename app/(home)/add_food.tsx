import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomButton from "../../components/CustomButton";
import usePersonStore from "../../hooks/useApp";
import { router } from "expo-router";
import { useProject } from "../../hooks/useProject";
import { FoodModel } from "../../models/Food";

const AddFoodScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { foodApp, addFood } = useProject()

  const [foodData, setFoodData] = useState({
    name: "",
    date: "",
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setFoodData({ ...foodData, date: date.toISOString() });
    hideDatePicker();
  };

  const handleAddFood = () => {
    FoodModel.create({ personId: foodApp.id, name: foodData.name, date: foodData.date }).then((food) => {
      addFood({ id: food.id, name: food.name, date: food.date, person_id: food.personId });
    }).catch(error => {
      console.log("Error : ", error)
    })
    router.back();
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Food</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Food Name</Text>
          <TextInput
            value={foodData.name}
            style={styles.input}
            placeholder="Food Name"
            onChangeText={(value) => setFoodData({ ...foodData, name: value })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <View style={{ width: '100%', paddingHorizontal: 8, paddingVertical: 15, borderColor: "#ccc", borderWidth: 1, backgroundColor: "#ffff", borderRadius: 5 }}>
              {foodData.date && <Text >{new Date(foodData.date).toDateString()}</Text>}
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text>
            {(Boolean(!foodData.date) || Boolean(!foodData.name)) &&
              "PLease select all the fields"}
          </Text>
          <CustomButton
            title="Add Food"
            onPress={() => handleAddFood()}
            disabled={Boolean(!foodData.date) || Boolean(!foodData.name)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  dateButton: {
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default AddFoodScreen;
