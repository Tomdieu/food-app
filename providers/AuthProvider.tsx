import { useRootNavigation, useSegments, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  login: (userData: User) => void;
  register: (userData: User) => void;
  logout: () => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  authInitialized: boolean;
};

export const AuthContext = createContext<AuthContextType>(null);

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [authInitialized, setAuthInitalized] = useState<boolean>(false);
  const login = async (userData: User) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {}
  };
  const register = async (userData: User) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {}
  };

  const useProtectedRoute = (user: User) => {
    const segments = useSegments();
    const router = useRouter();
    const [isNavigationReady, setNavigationReady] = useState(false);
    const rootNavigation = useRootNavigation();
    useEffect(() => {
      const unsubscribe = rootNavigation?.addListener("state", (event) => {
        setNavigationReady(true);
      });
      return function cleanup() {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [rootNavigation]);
    useEffect(() => {
      if (!isNavigationReady) {
        return;
      }

      const inAuthGroup = segments[0] === "(auth)";

      if (!authInitialized) return;

      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        !user &&
        !inAuthGroup
      ) {
        // Redirect to the sign-in page.
        router.push("/sign-in");
      } else if (user && inAuthGroup) {
        // Redirect away from the sign-in page.
        router.push("/");
      }
    }, [user, segments, authInitialized, isNavigationReady]);
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          setUser(JSON.parse(user));
        }
        setAuthInitalized(true);
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      }
    })();
  });

  // useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{ login, logout, user, authInitialized, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
