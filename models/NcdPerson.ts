import { openDatabase } from "../lib/db";

const db = openDatabase();

export class NCDPerson {
  id: number;
  name: string;
  personId: number;

  public static async getNcdOfPerson(userId: number): Promise<NCDPerson[]> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM NCDPerson WHERE person_id = ?",
          [userId],
          (txObj, { rows: { _array } }) => {
            const ncdPersons: NCDPerson[] = _array.map((data) => {
              const ncdPerson = new NCDPerson();
              ncdPerson.id = data["id"];
              ncdPerson.name = data["name"];
              ncdPerson.personId = data["person_id"];
              return ncdPerson;
            });
            console.info("NcdPerson object created")
            resolve(ncdPersons);
          },
          (txObj, error) => {
            reject("Could Not create NCDPerson Object")
            console.error("Error : ", error.message)
            return false;
          }
        );
      });
    });
  }

  public static async create({
    name,
    personId,
  }: {
    name: string;
    personId: number;
  }): Promise<NCDPerson> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO NCDPerson(name, person_id) VALUES (?, ?)",
          [name, personId],
          (txObj, result) => {
            const insertId = result.insertId;
            const ncdPerson = new NCDPerson();
            ncdPerson.id = insertId;
            ncdPerson.name = name;
            ncdPerson.personId = personId;
            resolve(ncdPerson);
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
            "UPDATE NCDPerson SET name = ? WHERE id = ?",
            [this.name, this.id],
            (txObj, result) => {
              if (result.rowsAffected > 0) {
                resolve();
              } else {
                reject(
                  new Error("No NCDPerson with the given id found for update.")
                );
              }
            }
          );
        });
      } else {
        reject(new Error("Cannot save an NCDPerson without an ID."));
      }
    });
  }

  public async delete(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.id) {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM NCDPerson WHERE id = ?",
            [this.id],
            (txObj, result) => {
              if (result.rowsAffected > 0) {
                resolve();
              } else {
                reject(
                  new Error(
                    "No NCDPerson with the given id found for deletion."
                  )
                );
              }
            }
          );
        });
      } else {
        reject(new Error("Cannot delete an NCDPerson without an ID."));
      }
    });
  }

  public async destroy(): Promise<void> {
    // Implement if needed
  }
}
