import { useState, useMemo, useEffect, type ReactNode } from "react";

import type { ThemeContextType, Theme } from "@/shared/types/ThemeContext.type";
import createAppContext from "@/shared/utils/createAppContext";
import storage from "@/shared/utils/storage";

const THEME_STORAGE_PREFERRED_KEY = "QST-FAV_THEME";
const THEME_STORAGE_CURRENT_KEY = "QST-CUR_THEME";
const DEFAULT_THEME: Theme = "light";

function getSystemTheme(): Theme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return DEFAULT_THEME;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const [ThemeContext, useThemeContext] =
  createAppContext<ThemeContextType>("ThemeContext");

export { useThemeContext };

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preferred, setPreferredState] = useState<Theme>(
    () => storage.get<Theme>(THEME_STORAGE_PREFERRED_KEY) ?? getSystemTheme(),
  );
  const [current, setCurrentState] = useState<Theme>(
    () => storage.get<Theme>(THEME_STORAGE_CURRENT_KEY) ?? getSystemTheme(),
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

  useEffect(() => {
    if (current === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [current]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
