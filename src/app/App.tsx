import { Suspense } from "react";
import { Navbar } from "widgets/Navbar/ui/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { ClassNames } from "../shared/lib/classNames/ClassNames";
import { AppRouter } from "./providers/router";
import { useTheme } from "./providers/ThemeProvider";
import "./styles/index.scss";

export function App() {
  const { theme } = useTheme();
  return (
    <div className={ClassNames(`app ${theme}`, {}, [])}>
      <Suspense fallback="loading">
        <Navbar />
        <div className="page-content">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}
