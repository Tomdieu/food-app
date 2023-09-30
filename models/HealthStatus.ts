import { openDatabase } from "../lib/db";

const db = openDatabase();

export class HealthStatus {
  id: number;
  personId: number;
  date: string;
  weight: number;
  height: number;
  feelingWell: boolean;

  public static async getHealthStatusOfPerson(
    userId: number
  ): Promise<HealthStatus[]> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM HealthStatus WHERE person_id = ?",
          [userId],
          (txObj, { rows: { _array } }) => {
            const healthStatuses: HealthStatus[] = _array.map((data) => {
              const healthStatus = new HealthStatus();
              healthStatus.id = data["id"];
              healthStatus.personId = data["person_id"];
              healthStatus.date = data["date"];
              healthStatus.weight = data["weight"];
              healthStatus.height = data["height"];
              healthStatus.feelingWell = !!data["feeling_well"];
              return healthStatus;
            });
            resolve(healthStatuses);
          }
        );
      });
    });
  }

  public static async create({
    personId,
    date,
    weight,
    height,
    feelingWell,
  }: {
    personId: number;
    date: string;
    weight: number;
    height: number;
    feelingWell: boolean;
  }): Promise<HealthStatus> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO HealthStatus(person_id, date, weight, height, feeling_well) VALUES (?, ?, ?, ?, ?)",
          [personId, date, weight, height, feelingWell ? 1 : 0],
          (txObj, result) => {
            const insertId = result.insertId;
            const healthStatus = new HealthStatus();
            healthStatus.id = insertId;
            healthStatus.personId = personId;
            healthStatus.date = date;
            healthStatus.weight = weight;
            healthStatus.height = height;
            healthStatus.feelingWell = feelingWell;
            resolve(healthStatus);
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
            "UPDATE HealthStatus SET date = ?, weight = ?, height = ?, feeling_well = ? WHERE id = ?",
            [
              this.date,
              this.weight,
              this.height,
              this.feelingWell ? 1 : 0,
              this.id,
            ],
            (txObj, result) => {
              if (result.rowsAffected > 0) {
                resolve();
              } else {
                reject(
                  new Error(
                    "No HealthStatus with the given id found for update."
                  )
                );
              }
            }
          );
        });
      } else {
        reject(new Error("Cannot save a HealthStatus without an ID."));
      }
    });
  }

  public async delete(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.id) {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM HealthStatus WHERE id = ?",
            [this.id],
            (txObj, result) => {
              if (result.rowsAffected > 0) {
                resolve();
              } else {
                reject(
                  new Error(
                    "No HealthStatus with the given id found for deletion."
                  )
                );
              }
            }
          );
        });
      } else {
        reject(new Error("Cannot delete a HealthStatus without an ID."));
      }
    });
  }

  public static async destroy(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (id) {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM HealthStatus WHERE id = ?",
            [id],
            (txObj, result) => {
              if (result.rowsAffected > 0) {
                resolve();
              } else {
                reject(
                  new Error(
                    "No HealthStatus with the given id found for deletion."
                  )
                );
              }
            }
          );
        });
      } else {
        reject(new Error("Cannot delete a HealthStatus without an ID."));
      }
    });
  }
}
