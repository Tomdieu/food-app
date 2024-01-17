import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import CustomButton from "../../components/CustomButton";
import usePersonStore from "../../hooks/useApp";
import { SelectList } from "react-native-dropdown-select-list";
import { useRouter } from "expo-router";
import { useProject } from "../../hooks/useProject";
import { NCDPerson } from "../../models/NcdPerson";

const UpdateProfileScreen = () => {
  const router = useRouter();
  const { person, updatePerson, savePersonData } = usePersonStore();
  const { foodApp, addNcdPerson } = useProject()
  const [ncd, setNcd] = useState("");
  const [selected, setSelected] = React.useState("");

  console.log("Food App State ", foodApp)
  const [personData, setPersonData] = useState({
    name: foodApp.name,
    password: foodApp.password,
    obese: false,
    ncdPersons: foodApp.ncdPerson,
  });

  // const data = [
  //   { key: "1", value: "Malaria" },
  //   { key: "2", value: "HIV" },
  //   { key: "3", value: "Cholera" },
  //   { key: "4", value: "Typhoid" },
  // ];

  const handleProfileUpdate = () => {
    updatePerson(personData);
    savePersonData();
    router.back();
  };

  const addNcd = () => {
    if (ncd) {
      NCDPerson.create({ name: ncd, personId: foodApp.id }).then((_ncd) => {
        addNcdPerson({ id: _ncd.id, name: _ncd.name, person_id: _ncd.personId });
        setPersonData({
          ...personData,
          ncdPersons: [...personData.ncdPersons, { id: _ncd.id, name: _ncd.name, person_id: _ncd.personId }],
        });
      }).catch(error => {
        console.log("Error : ", error)
      })
      setNcd("");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={personData.name}
            onChangeText={(text) =>
              setPersonData({ ...personData, name: text })
            }
            placeholder="Name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={personData.password}
            onChangeText={(text) =>
              setPersonData({ ...personData, password: text })
            }
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Obese</Text>
          <Checkbox
            style={styles.checkbox}
            value={personData.obese}
            onValueChange={(value) =>
              setPersonData({ ...personData, obese: value })
            }
          />
        </View>
        <View style={styles.ncdContainer}>
          <Text style={styles.label}>Non-Communicable Disease</Text>
          {/* <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
          /> */}
          <View style={styles.ncdInputContainer}>
            <TextInput
              style={{ ...styles.ncdInput }}
              placeholder="Enter NCD"
              value={ncd}
              inputMode="text"
              onChangeText={(value) => setNcd(value)}
            />
            <CustomButton
              title="Add NCD"
              style={styles.ncdButton}
              onPress={() => addNcd()}
            />
          </View>
          <Text>{personData.ncdPersons.map((n) => n.name).join(", ")}</Text>
        </View>
        <CustomButton
          title="Update Profile"
          style={styles.updateButton}
          onPress={() => handleProfileUpdate}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  ncdContainer: {
    marginBottom: 20,
  },
  ncdInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ncdInput: {
    flex: 1,
    height: 40,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
  },
  ncdButton: {
    width: 100,
  },
  updateButton: {
    alignSelf: "center",
  },
});

export default UpdateProfileScreen;
