import { Link, Route, Routes } from "react-router-dom";
import { Counter } from "./Components/Counter/Counter";
import "./styles/index.scss";
import { MainPageAsync } from "./Components/Pages/MainPage/MainPage.async";
import { AboutPageAxync } from "./Components/Pages/AboutPage/AboutPage.async";
import { Suspense, useContext, useState } from "react";
import { Theme, ThemeContext } from "./theme/ThemeContext";
import { useTheme } from "./theme/useTheme";
import { ClassNames } from "./Helpers/ClassNames/ClassNames";
export function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={ClassNames("app", { hovered: true }, ["btn"])}>
      <button onClick={toggleTheme}>toggleTheme</button>
      <Link to="/">MainPage</Link>
      <Link to="/about">AboutPage</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPageAsync />} />
          <Route path="/about" element={<AboutPageAxync />} />
        </Routes>
      </Suspense>
    </div>
  );
}
