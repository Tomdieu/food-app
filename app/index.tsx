import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";
import { STATUS_BAR_HEIGHT } from "../constants";
import usePersonStore from "../hooks/useApp";
import { openDatabase } from "../lib/db";

import { useProject } from "../hooks/useProject";
import { PersonModel } from "../models/Person";

const db = openDatabase()

const App = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { updatePerson, person, savePersonData } = usePersonStore();
  const { setPerson } = useProject()

  const handleLogin = () => {
    const authenticatedPerson = {
      name: name,
      password: password,
    };

    if (!authenticatedPerson.name || !authenticatedPerson.password) {
      return Alert.alert("Error", "Please fill all the login informations");
    }

    let insertId: number;

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Person (name, password) VALUES (?, ?)",
        [name, password],
        (txObj, result) => {
          insertId = result.insertId;
          // console.log(result);

          // Now that the INSERT is complete, query the newly inserted person in a separate transaction
          db.transaction((tx2) => {
            tx2.executeSql(
              "SELECT * FROM Person WHERE id = ?",
              [insertId],
              (txObj2, { rows: { _array } }) => {
                console.log(_array);
                setPassword(_array[0]);
                PersonModel.get(insertId).then(person => {
                  console.log(person.name)
                  setPerson(person);

                }).catch((err) => {
                  console.log("Error Occur : ", err)
                })
              }
            );
          });
        }
      );

    });

    // Update the Person with the authenticated data
    updatePerson(authenticatedPerson);
    savePersonData();

    router.push("/menu");
  };

  console.log(person.name);

  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: STATUS_BAR_HEIGHT, paddingHorizontal: 3 }}
    >
      <StatusBar barStyle="light-content" />
      <View>
        <Text style={{ fontWeight: "900", fontSize: 30 }}>Food App</Text>
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: 8,
          justifyContent: "center",
          paddingHorizontal: 8,
        }}
      >
        <View style={{ justifyContent: "center", marginVertical: 8 }}>
          <Text style={{ fontWeight: "800", fontSize: 30 }}>
            Welcome To Food App
          </Text>
          <Text>Track and Control what you eat</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <CustomButton title="Login" onPress={() => handleLogin()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background
    padding: 16,
  },
  textContainer: {
    // alignItems: "center",
    marginBottom: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  formContainer: {
    gap: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc", // Add a border color
    borderRadius: 10, // Add border radius for rounded corners
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333", // Add label text color
  },
  input: {
    height: 40,
    borderColor: "#aaa", // Add input border color
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "white", // Add input background color
  },
});

export default App;
