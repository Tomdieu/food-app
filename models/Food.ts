import { openDatabase } from "../lib/db";

const db = openDatabase();

export class FoodModel {
  id: number;
  name: string;
  personId: number;
  date: string;

  public static async getFoodsOfUser(userId: number): Promise<FoodModel[]> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Food WHERE person_id = ?",
          [userId],
          (txObj, { rows: { _array } }) => {
            const foods: FoodModel[] = _array.map((data) => {
              const food = new FoodModel();
              food.id = data["id"];
              food.name = data["name"];
              food.personId = data["person_id"];
              food.date = data["date"];
              return food;
            });
            resolve(foods);
          }
        );
      });
    });
  }

  public static async create({
    name,
    personId,
    date,
  }: {
    name: string;
    personId: number;
    date: string;
  }): Promise<FoodModel> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Food(name, person_id, date) VALUES (?, ?, ?)",
          [name, personId, date],
          (txObj, result) => {
            const insertId = result.insertId;
            const food = new FoodModel();
            food.id = insertId;
            food.name = name;
            food.personId = personId;
            food.date = date;
            resolve(food);
          }
        );
      });
    });
  }

  public async save(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.id) {
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE Food SET name = ?, date = ? WHERE id = ?",
            [this.name, this.date, this.id],
            (txObj, result) => {
              if (result.rowsAffected > 0) {
                resolve();
              } else {
                reject(
                  new Error("No food with the given id found for update.")
                );
              }
            }
          );
        });
      } else {
        reject(new Error("Cannot save a food without an ID."));
      }
    });
  }

  public static async delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Food WHERE id = ?",
          [id],
          (txObj, result) => {
            if (result.rowsAffected > 0) {
              resolve();
            } else {
              reject(
                new Error("No food with the given id found for deletion.")
              );
            }
          }
        );
      });
    });
  }

  public async destroy(): Promise<void> {
    if (this.id) {
      await FoodModel.delete(this.id);
    }
  }
}
