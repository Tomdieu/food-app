import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for user data
interface UserData {
  id: number;
  name: string;
  password: string;
  // Add other user-related fields as needed
}

// Define the initial state for authentication
interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (userData: UserData) => void;
  register: (userData: UserData) => void;
  logout: () => void;
  loadUserFromStorage: () => void;
}

// Create the Zustand store
const useAuth = create<AuthState>((set, get) => ({
  // Initial state
  isAuthenticated: false,
  user: null,

  // Actions
  login: async (userData: UserData) => {
    // Perform your authentication logic here (e.g., API calls, validation)
    // If authentication is successful, update the state and store user data in AsyncStorage
    set({ isAuthenticated: true, user: userData });
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  },

  register: async (userData: UserData) => {
    // Perform your user registration logic here (e.g., API calls, validation)
    // If registration is successful, update the state and store user data in AsyncStorage
    set({ isAuthenticated: true, user: userData });
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  },

  logout: async () => {
    // Log out the user by clearing the state and AsyncStorage
    set({ isAuthenticated: false, user: null });
    await AsyncStorage.removeItem("user");
  },

  // Load user data from AsyncStorage when the app starts
  loadUserFromStorage: async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        set({ isAuthenticated: true, user: JSON.parse(userData) });
      }
    } catch (error) {
      console.error("Error loading user data from AsyncStorage:", error);
    }
  },
}));

export default useAuth;
