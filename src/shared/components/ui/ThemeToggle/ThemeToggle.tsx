import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/shared/context/ThemeContext";
import styles from "./themetoggle.module.css";

export default function ThemeToggle() {
  const { current, toggleTheme } = useThemeContext();
  const isDark = current === "dark";

  return (
    <button
      className={styles.toggleBtn}
      onClick={toggleTheme}
      aria-label={isDark ? "Passa al tema chiaro" : "Passa al tema scuro"}
      title={isDark ? "Passa al tema chiaro" : "Passa al tema scuro"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
