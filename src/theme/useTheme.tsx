import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";
interface IThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}
export const useTheme = (): IThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };
  return { theme, toggleTheme };
};
