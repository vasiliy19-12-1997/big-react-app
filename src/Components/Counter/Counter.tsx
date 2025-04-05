import { useState } from "react";
import s from "./Counter.module.scss";
export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className={s.Counter}>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};
