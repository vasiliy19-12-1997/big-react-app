import { createContext } from "react";
export const enum Theme {
  LIGHT = "light",
  DARK = "dark",
  CLEAR = "clear",
}
export interface IThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}
export const ThemeContext = createContext<IThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = "theme";
