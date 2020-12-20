import React, { useState } from "react";
import { useForm } from "./customHooks/useForm";

const App = () => {
  // if you want to update things at the same time, can use useState with an object
  // otherwise you can use multiple useStates to keep things separate
  const [count, setCount] = useState(10);
  const [count2, setCount2] = useState(20);

  const [values, setValues] = useForm({ email: "", password: "" });
  return (
    <div>
      <button
        onClick={() => {
          setCount((state) => state + 1);
          setCount2((state2) => state2 + 1);
        }}
      >
        +
      </button>
      <div>count 1: {count}</div>
      <div>count 2: {count2}</div>

      <input name="email" value={values.email} onChange={setValues} />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={setValues}
      />
    </div>
  );
};

export default App;
