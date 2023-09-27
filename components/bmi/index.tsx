import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBMI = () => {
    // Ensure height and weight are valid numbers
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (
      isNaN(heightInMeters) ||
      isNaN(weightInKg) ||
      heightInMeters <= 0 ||
      weightInKg <= 0
    ) {
      setBmiResult("Please enter valid height and weight.");
      return;
    }

    // Calculate BMI
    const bmi = weightInKg / (heightInMeters * heightInMeters);

    // Display the BMI result
    setBmiResult(`Your BMI: ${bmi.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BMI Calculator</Text>
      <TextInput
        placeholder="Height (in cm)"
        style={styles.input}
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Weight (in kg)"
        style={styles.input}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "#000",
          paddingVertical: 12,
          alignItems: "center",
          borderRadius: 8,
          marginVertical: 5,
        }}
        onPress={calculateBMI}
      >
        <View>
          <Text style={{ color: "#fff" }}>Calculate BMI</Text>
        </View>
      </TouchableOpacity>
      {bmiResult && <Text style={styles.result}>{bmiResult}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default BMICalculator;
