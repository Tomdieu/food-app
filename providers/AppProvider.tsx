import React, { createContext, useContext } from "react";

import { db } from "../lib/db";

type AppContextType = {};

export const AppContext = createContext<AppContextType>(null);

export function useApp() {
  return useContext(AppContext);
}

type AppProviderProps = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  // const [user,setUser] =
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}
