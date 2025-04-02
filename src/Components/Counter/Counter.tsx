import { useState } from "react";
import "./Counter.scss";
export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="Counter">
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};
