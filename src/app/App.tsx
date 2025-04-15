import { Navbar } from "widgets/Navbar/ui/Navbar";
import { ClassNames } from "../shared/lib/classNames/ClassNames";
import "./styles/index.scss";
import { Sidebar } from "widgets/Sidebar";
import { AppRouter } from "./providers/router";
import { useTheme } from "./providers/ThemeProvider";

export function App() {
  const { theme } = useTheme();
  return (
    <div className={ClassNames(`app ${theme}`, {}, [])}>
      <Navbar />
      <div className="page-content">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  );
}
