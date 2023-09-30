import { create } from "zustand";

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
  setPerson(person) {
    set((state) => ({
      foodApp: {
        ...state.foodApp,
        ...person,
      },
    }));
  },
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
  loadData() {},
  updatePassword: (password) =>
    set((state) => ({
      foodApp: {
        ...state.foodApp,
        password,
      },
    })),
}));
