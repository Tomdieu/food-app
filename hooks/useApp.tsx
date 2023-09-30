import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Food {
  name: string;
  date: string;
}

interface NCDPerson {
  name: string;
}

interface HealthStatus {
  date: string;
  feeling_well: boolean;
  health_problem: string;
  weight: number;
  height: number;
}

interface PersonState {
  name: string;
  obese: boolean;
  password: string;
  foods: Food[];
  ncdPersons: NCDPerson[];
  healthStatus: HealthStatus[];
}

interface PersonStore {
  person: PersonState;
  updatePerson: (updatedPerson: Partial<PersonState>) => void;
  addFood: (food: Food) => void;
  addNCDPerson: (ncdPerson: NCDPerson) => void;
  addHealthStatus: (healthStatus: HealthStatus) => void;
  loadPersonData: () => Promise<void>;
  savePersonData: () => Promise<void>;
}

// Define the initial state structure
const initialState: PersonState = {
  name: "",
  password: "",
  foods: [],
  ncdPersons: [],
  healthStatus: [],
  obese: false,
};

// Create the Zustand store
const usePersonStore = create<PersonStore>((set) => ({
  // State
  person: initialState,

  // Actions
  updatePerson: (updatedPerson) => {
    set((state) => ({
      person: { ...state.person, ...updatedPerson },
    }));
  },

  addFood: (food) => {
    set((state) => ({
      person: {
        ...state.person,
        foods: [...state.person.foods, food],
      },
    }));
  },

  addNCDPerson: (ncdPerson) => {
    set((state) => ({
      person: {
        ...state.person,
        ncdPersons: [...state.person.ncdPersons, ncdPerson],
      },
    }));
  },

  addHealthStatus: (healthStatus) => {
    set((state) => ({
      person: {
        ...state.person,
        healthStatus: [...state.person.healthStatus, healthStatus],
      },
    }));
  },

  // Load the person's data from AsyncStorage
  loadPersonData: async () => {
    try {
      const storedData = await AsyncStorage.getItem("personData");
      if (storedData) {
        const parsedData = JSON.parse(storedData) as PersonState;
        set(() => ({
          person: parsedData,
        }));
      }
    } catch (error) {
      console.error("Error loading person data from AsyncStorage:", error);
    }
  },

  // Save the person's data to AsyncStorage
  savePersonData: async () => {
    try {
      await AsyncStorage.setItem("personData", JSON.stringify(initialState));
    } catch (error) {
      console.error("Error saving person data to AsyncStorage:", error);
    }
  },
}));

export default usePersonStore;
