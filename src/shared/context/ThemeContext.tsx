import { useState, useMemo, type ReactNode } from "react";

import type { ThemeContextType, Theme } from "../types/ThemeContext.type";
import createAppContext from "../utils/createAppContext";
import storage from "../utils/storage";

const THEME_STORAGE_PREFERRED_KEY = "QST-FAV_THEME";
const THEME_STORAGE_CURRENT_KEY = "QST-CUR_THEME";
const DEFAULT_THEME: Theme = "light";

const [ThemeContext, useThemeContext] =
  createAppContext<ThemeContextType>("ThemeContext");

export { useThemeContext };

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preferred, setPreferredState] = useState<Theme>(
    () => storage.get<Theme>(THEME_STORAGE_PREFERRED_KEY) ?? DEFAULT_THEME,
  );
  const [current, setCurrentState] = useState<Theme>(
    () => storage.get<Theme>(THEME_STORAGE_CURRENT_KEY) ?? DEFAULT_THEME,
  );

  const setPreferred = (newPreferred: Theme) => {
    storage.persist(THEME_STORAGE_PREFERRED_KEY, newPreferred);
    setPreferredState(newPreferred);
  };

  const setCurrent = (newCurrent: Theme) => {
    storage.persist(THEME_STORAGE_CURRENT_KEY, newCurrent);
    setCurrentState(newCurrent);
  };

  const toggleTheme = () => {
    const nextTheme = current === "light" ? "dark" : "light";
    setCurrent(nextTheme);
  };

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      current,
      preferred,
      setCurrent,
      setPreferred,
      toggleTheme,
    }),
    [current, preferred],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
