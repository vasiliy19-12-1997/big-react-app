import { render } from "react-dom";
import { App } from "./App";
import { testFunc } from "./test";

testFunc(1997);

render(<App />, document.getElementById("root"));
