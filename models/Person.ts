import { openDatabase } from "../lib/db";
import { FoodModel } from "./Food";
import { HealthStatus } from "./HealthStatus";
import { NCDPerson } from "./NcdPerson";

const db = openDatabase();

export class PersonModel {
  public id: number;
  public name: string;
  public password: string;

  public static async get(id: number): Promise<PersonModel | null> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Person WHERE id = ?",
          [id],
          (txObj, { rows: { _array } }) => {
            if (_array.length === 0) {
              resolve(null); // No person found with the given id.
            } else {
              const data = _array[0];
              const p = new PersonModel();
              p.id = data["id"];
              p.name = data["name"];
              p.password = data["password"];
              resolve(p);
            }
          }
        );
      });
    });
  }

  public static async create({
    name,
    password,
  }: {
    name: string;
    password: string;
  }): Promise<PersonModel> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Person(name, password) VALUES (?, ?)",
          [name, password],
          (txObj, result) => {
            const insertId = result.insertId;
            PersonModel.get(insertId)
              .then((person) => resolve(person))
              .catch((error) => reject(error));
          }
        );
      });
    });
  }

  public async save(): Promise<PersonModel> {
    return new Promise((resolve, reject) => {
      if (this.id) {
        // If the person has an ID, update the existing record
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE Person SET name = ?, password = ? WHERE id = ?",
            [this.name, this.password, this.id],
            (txObj, result) => {
              if (result.rowsAffected > 0) {
                // Updated successfully, resolve with this instance
                resolve(this);
              } else {
                reject(
                  new Error("No person with the given id found for update.")
                );
              }
            }
          );
        });
      } else {
        // If the person doesn't have an ID, create a new record
        db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO Person(name, password) VALUES (?, ?)",
            [this.name, this.password],
            (txObj, result) => {
              const insertId = result.insertId;
              PersonModel.get(insertId)
                .then((person) => {
                  this.id = person?.id || 0;
                  resolve(this);
                })
                .catch((error) => reject(error));
            }
          );
        });
      }
    });
  }

  public async destroy(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.id) {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM Person WHERE id = ?",
            [this.id],
            (txObj, result) => {
              if (result.rowsAffected > 0) {
                resolve(true); // Deletion successful
              } else {
                reject(
                  new Error("No person with the given id found for deletion.")
                );
              }
            }
          );
        });
      } else {
        // If the person doesn't have an ID, there's nothing to delete
        resolve(false);
      }
    });
  }

  public static async update({
    id,
    name,
    password,
  }: {
    id: number;
    name: string;
    password: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE Person SET name = ?, password = ? WHERE id = ?",
          [name, password, id],
          (txObj, result) => {
            if (result.rowsAffected > 0) {
              resolve();
            } else {
              reject(
                new Error("No person with the given id found for update.")
              );
            }
          }
        );
      });
    });
  }

  public getAllFoods() {
    if (this.id) {
      return FoodModel.getFoodsOfUser(this.id);
    }
    return [];
  }

  public getAllNcd() {
    if (this.id) {
      return NCDPerson.getNcdOfPerson(this.id);
    }
    return [];
  }

  public getAllHealthStatus() {
    if (this.id) {
      return HealthStatus.getHealthStatusOfPerson(this.id);
    }
    return [];
  }
}
