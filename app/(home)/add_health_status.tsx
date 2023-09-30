import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import usePersonStore from "../../hooks/useApp";
import { router } from "expo-router";

const AddHealthStatusScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [healthFormData, setHealthFormData] = useState({
    health_problem: "",
    weight: 0,
    height: 0,
    feeling_well: false,
    date: "",
  });

  const { addHealthStatus, savePersonData } = usePersonStore();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setHealthFormData({ ...healthFormData, date: date.toISOString() });
    hideDatePicker();
  };

  const handleSave = () => {
    addHealthStatus(healthFormData);
    savePersonData();
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Health Status</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <Text>{healthFormData.date}</Text>
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
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={healthFormData.feeling_well}
            onValueChange={(value) =>
              setHealthFormData({ ...healthFormData, feeling_well: value })
            }
          />
          <Text style={styles.checkboxLabel}>Feeling Well</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Health Problem</Text>
          <TextInput
            style={styles.input}
            placeholder="Health Problem"
            value={healthFormData.health_problem}
            onChangeText={(value) =>
              setHealthFormData({ ...healthFormData, health_problem: value })
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            placeholder="Weight"
            inputMode="numeric"
            value={healthFormData.weight.toString()}
            onChangeText={(value) =>
              setHealthFormData({ ...healthFormData, weight: Number(value) })
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height</Text>
          <TextInput
            style={styles.input}
            placeholder="Height"
            inputMode="numeric"
            value={healthFormData.height.toString()}
            onChangeText={(value) =>
              setHealthFormData({ ...healthFormData, height: Number(value) })
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title="Save" onPress={() => handleSave()} />
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
    marginTop: 3,
    paddingVertical: 2,
    paddingTop: 0,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default AddHealthStatusScreen;
