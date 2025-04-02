import { render } from "react-dom";
import { testFunc } from "./test";
import { Counter } from "./Components/Counter/Counter";

testFunc(1997);

render(
  <div>
    <Counter />
  </div>,
  document.getElementById("root")
);
