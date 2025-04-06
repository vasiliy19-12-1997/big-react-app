import { render } from "react-dom";
import { App } from "./App";
import { testFunc } from "./test";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";

testFunc(1997);

render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
