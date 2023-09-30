import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

export function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase(`database.db`);
  return db;
}
