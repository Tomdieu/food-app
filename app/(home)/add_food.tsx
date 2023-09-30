import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomButton from "../../components/CustomButton";
import usePersonStore from "../../hooks/useApp";
import { router } from "expo-router";

const AddFoodScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [foodData, setFoodData] = useState({
    name: "",
    date: "",
  });

  const { addFood, savePersonData } = usePersonStore();

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
    addFood(foodData);
    savePersonData();
    router.back();
  };

  console.log(foodData.date);

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
          {foodData.date && <Text>{foodData.date}</Text>}
          <CustomButton
            title="Select Date"
            onPress={showDatePicker}
            style={styles.dateButton}
          />
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
