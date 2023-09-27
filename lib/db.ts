import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("sqlite.db"); // Changed the database name

db.transaction((tx) => {
  // Create the foods table
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS foods (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, calories INTEGER, description TEXT, image TEXT)"
  );

  // Create the ingredients table
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS ingredients (id INTEGER PRIMARY KEY AUTOINCREMENT, food_id INTEGER, ingredient_name TEXT)"
  );

  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY AUTOINCREMENT, height REAL, weight REAL)"
  );

  tx.executeSql(`INSERT INTO foods(name,calories,description) VALUES ('koki',255,'zsasdas')`,())
});
