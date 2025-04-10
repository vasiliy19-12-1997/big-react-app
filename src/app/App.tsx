import { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ClassNames } from "../shared/lib/classNames/ClassNames";
import "./styles/index.scss";
import { useTheme } from "./providers/ThemeProvider/lib/useTheme";
import { MainPage } from "pages/MainPage";
import { AboutPage } from "pages/AboutPage";

export function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={ClassNames(`app ${theme}`, {}, [])}>
      <button onClick={toggleTheme}>toggleTheme</button>
      <Link to="/">MainPage</Link>
      <Link to="/about">AboutPage</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
