import { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ClassNames } from "../shared/lib/classNames/ClassNames";
import "./styles/index.scss";
import { useTheme } from "./providers/ThemeProvider/lib/useTheme";
import { MainPage } from "pages/MainPage";
import { AboutPage } from "pages/AboutPage";
import { AppRouter } from "./providers/router/ui/AppRouter";

export function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={ClassNames(`app ${theme}`, {}, [])}>
      <button onClick={toggleTheme}>toggleTheme</button>
      <Link to="/">MainPage</Link>
      <Link to="/about">AboutPage</Link>
      <AppRouter />
    </div>
  );
}
