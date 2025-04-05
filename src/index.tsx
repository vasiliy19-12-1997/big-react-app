import { render } from "react-dom";
import { App } from "./App";
import { testFunc } from "./test";
import { BrowserRouter } from "react-router-dom";

testFunc(1997);

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
