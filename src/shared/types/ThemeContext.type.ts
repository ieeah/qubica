export type Theme = "light" | "dark";

export type ThemeContextType = {
  preferred: Theme;
  current: Theme;
  setCurrent: (theme: Theme) => void;
  setPreferred: (theme: Theme) => void;
  toggleTheme: () => void;
};