import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import usePersonStore from "../../hooks/useApp";
import { router } from "expo-router";
import { useProject } from "../../hooks/useProject";
import { HealthStatus } from "../../models/HealthStatus";

const AddHealthStatusScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [healthFormData, setHealthFormData] = useState({
    health_problem: "",
    weight: 0,
    height: 0,
    feeling_well: false,
    date: "",
  });

  const { addHealthStatus, foodApp } = useProject()


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
    HealthStatus.create({ feelingWell: healthFormData.feeling_well, weight: healthFormData.weight, height: healthFormData.height, date: healthFormData.date, personId: foodApp.id }).then(healthStatus => {

      addHealthStatus({ person_id: foodApp.id, feeling_well: healthStatus.feelingWell, date: healthStatus.date, weight: healthStatus.weight, height: healthStatus.height });
    }).catch(error => {
      console.log("Error : ", error)
    })
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Health Status</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <View style={{ width: '100%', paddingHorizontal: 8, paddingVertical: 15, borderColor: "#ccc", borderWidth: 1, backgroundColor: "#ffff", borderRadius: 5 }}>
              {healthFormData.date && <Text >{new Date(healthFormData.date).toDateString()}</Text>}
            </View>
          </TouchableOpacity>

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
          <TouchableWithoutFeedback onPress={() => {
            setHealthFormData({ ...healthFormData, feeling_well: !healthFormData.feeling_well })
          }}>

            <Text style={styles.checkboxLabel}>Feeling Well</Text>
          </TouchableWithoutFeedback>
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
          <Text style={styles.label}>Weight (kg)</Text>
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
          <Text style={styles.label}>Height (cm)</Text>
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
          <CustomButton title="Save" disabled={!healthFormData.date || !healthFormData.health_problem || !healthFormData.height || !healthFormData.weight} onPress={() => handleSave()} />
        </View>
      </View>
    </ScrollView>
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
