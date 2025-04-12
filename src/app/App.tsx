import { Navbar } from "widgets/Navbar/ui/Navbar";
import { ClassNames } from "../shared/lib/classNames/ClassNames";
import { AppRouter } from "./providers/router/ui/AppRouter";
import { useTheme } from "./providers/ThemeProvider/lib/useTheme";
import "./styles/index.scss";

export function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={ClassNames(`app ${theme}`, {}, [])}>
      <Navbar />
      <button onClick={toggleTheme}>toggleTheme</button>
      <AppRouter />
    </div>
  );
}
