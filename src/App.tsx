import { Link, Route, Routes } from "react-router-dom";
import { Counter } from "./Components/Counter/Counter";
import "./index.scss";
import { MainPageAsync } from "./Components/Pages/MainPage/MainPage.async";
import { AboutPageAxync } from "./Components/Pages/AboutPage/AboutPage.async";
import { Suspense } from "react";
export function App() {
  return (
    <div className="app">
      <Counter />
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
