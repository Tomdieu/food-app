import React, { useEffect } from "react";
import { Slot } from "expo-router";
import AuthProvider from "../providers/AuthProvider";
import { Platform } from "react-native";
import { openDatabase } from "../lib/db";

const db = openDatabase();

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      db.transaction((tx) => {

        // tx.executeSql(`DROP TABLE IF EXISTS Person;`)
        // tx.executeSql(`DROP TABLE IF EXISTS Food;`)
        // tx.executeSql(`DROP TABLE IF EXISTS HealthStatus;`)
        // tx.executeSql(`DROP TABLE IF EXISTS NCDPerson;`)

        // Create the Person table

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Person (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password VARCHAR(255))"
        );

        // Create the Food table
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Food (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date VARCHAR(255),person_id INTEGER)"
        );

        // Create the HealthStatus table
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS HealthStatus (id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER, date TEXT, weight REAL, height REAL, feeling_well INTEGER)"
        );

        // Create the NCDPerson table
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS NCDPerson (id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER, name TEXT)"
        );


      }, (error) => {
        console.log("Error", error);
      });
    }
  }, []);
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
