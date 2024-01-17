import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { PersonModel } from "../models/Person";
import { FoodModel } from "../models/Food";
import { HealthStatus } from "../models/HealthStatus";
import { NCDPerson } from "../models/NcdPerson";

interface PersonState {
  id: number;
  name: string;
  password: string;
}

interface FoodState {
  id?: number;
  name: string;
  date: string;
  person_id: number;
}

interface HealthStatusState {
  id?: number;
  person_id: number;
  date: string;
  weight: number;
  height: number;
  feeling_well: boolean;
}

interface NCDPersonState {
  id?: number;
  person_id: number;
  name: string;
}

interface ProjectState {
  id: number | null;
  name: string;
  password: string;
  foods: FoodState[];
  healthStatus: HealthStatusState[];
  ncdPerson: NCDPersonState[];
}

interface ProjectStore {
  foodApp: ProjectState;
  getPerson: () => ProjectState;
  setPerson: (person: PersonState) => void;
  getFoods: () => FoodState[];
  getNdcPerson: () => NCDPersonState[];
  getHealthStatus: () => HealthStatusState[];
  addFood: (food: FoodState) => void;
  addNcdPerson: (ndcPerson: NCDPersonState) => void;
  addHealthStatus: (healthStatus: HealthStatusState) => void;
  updateName: (name: string) => void;
  updatePassword: (password: string) => void;
  loadData: () => void;
}

const initialState: ProjectState = {
  id: null,
  name: "",
  foods: [],
  healthStatus: [],
  ncdPerson: [],
  password: "",
};

export const useProject = create<ProjectStore>((set, get) => ({
  foodApp: initialState,
  async setPerson(person) {
    set((state) => ({
      foodApp: {
        ...state.foodApp,
        ...person,
      },
    }));
    await AsyncStorage.setItem("userId", person.id.toString());
  },
  getPerson: () => get().foodApp,
  getFoods: () => get().foodApp.foods,
  getNdcPerson: () => get().foodApp.ncdPerson,
  getHealthStatus: () => get().foodApp.healthStatus,
  addFood: (food) =>
    set((state) => ({
      foodApp: {
        ...state.foodApp,
        foods: [...state.foodApp.foods, food],
      },
    })),
  addNcdPerson: (ncdPerson) =>
    set((state) => ({
      foodApp: {
        ...state.foodApp,
        ncdPerson: [...state.foodApp.ncdPerson, ncdPerson],
      },
    })),
  addHealthStatus: (healthStatus) =>
    set((state) => ({
      foodApp: {
        ...state.foodApp,
        healthStatus: [...state.foodApp.healthStatus, healthStatus],
      },
    })),
  updateName: (name) =>
    set((state) => ({
      foodApp: {
        ...state.foodApp,
        name,
      },
    })),
  loadData() {
    AsyncStorage.getItem("userId")
      .then((id) => {
        if (id) {
          return Number(id);
        } else {
          return null;
        }
      })
      .then((id) => {
        if (id) {
          return PersonModel.get(id);
        } else {
          return null;
        }
      })
      .then((person) => {
        if (person) {
          set((state) => ({
            foodApp: {
              ...state.foodApp,
              ...person,
            },
          }));

          // load foods
          FoodModel.getFoodsOfUser(person.id).then(food => {
            const foods = food.map(_food => ({ id: _food.id, name: _food.name, person_id: _food.personId, date: _food.date }));
            set((state) => ({
              foodApp: {
                ...state.foodApp,
                foods: foods,
              },
            }));
          })

          // load health status
          HealthStatus.getHealthStatusOfPerson(person.id).then(healthStatus => {
            const healthStatuses = healthStatus.map(_healthStatus => ({ id: _healthStatus.id, person_id: _healthStatus.personId, date: _healthStatus.date, weight: _healthStatus.weight, height: _healthStatus.height, feeling_well: _healthStatus.feelingWell }));
            set((state) => ({
              foodApp: {
                ...state.foodApp,
                healthStatus: healthStatuses,
              },
            }));
          })

          // load ncd person
          NCDPerson.getNcdOfPerson(person.id).then(ncdPerson => {
            const ncdPersons = ncdPerson.map(_ncdPerson => ({ id: _ncdPerson.id, person_id: _ncdPerson.personId, name: _ncdPerson.name }));
            set((state) => ({
              foodApp: {
                ...state.foodApp,
                ncdPerson: ncdPersons,
              },
            }));
          })
        }
      });
  },
  updatePassword: (password) =>
    set((state) => ({
      foodApp: {
        ...state.foodApp,
        password,
      },
    })),
}));
