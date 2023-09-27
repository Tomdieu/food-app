import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import React, { useMemo, useState } from "react";
import Checkbox from "expo-checkbox";
import SelectDropdown from "react-native-select-dropdown";

const FormsScreen = () => {
  const [isChecked, setChecked] = useState(false);
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];
  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Option 1",
        value: "option1",
      },
      {
        id: "2",
        label: "Option 2",
        value: "option2",
      },
    ],
    []
  );
  const [selectedId, setSelectedId] = useState<string>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontWeight: "700", fontSize: 30, marginVertical: 10 }}>
        Forms Screen
      </Text>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={(selectedId) => setSelectedId(selectedId)}
        selectedId={selectedId}
      />
      <View>
        <Text>Fruits </Text>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text>Pine Apple</Text>
      </View>
      <View>
        <Text>Select Counttry</Text>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FormsScreen;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
});
