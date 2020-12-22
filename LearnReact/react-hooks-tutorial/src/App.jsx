import React, { useState, useEffect } from "react";
import { useForm } from "./customHooks/useForm";
import { useFetch } from "./customHooks/useFetch";
// import Hello from "./Hello";
const App = () => {
  // if you want to update things at the same time, can use useState with an object
  // otherwise you can use multiple useStates to keep things separate
  const [count, setCount] = useState(10);
  const [count2, setCount2] = useState(20);

  // custom hook for form
  const [values, setValues] = useForm({
    email: "",
    password: "",
    firstName: "",
  });

  // const [showHello, setShowHello] = useState(true);

  // useEffect (for stuff to be called less, and clean up after renders)
  useEffect(() => {
    console.log("mounted!");
    const onMouseMove = (event) => {};
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      console.log("runs on unmount");
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [values.email]); // note this will run twice on change, mounted and immediately unmount after the event occurs

  useEffect(() => {
    console.log("mount2");
  }, []);

  const [factNumber, setFactNumber] = useState(() => {
    const numb = JSON.parse(localStorage.getItem("count")) || 0;
    console.log("getting count", numb);
    return numb;
  });
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(factNumber));
  }, [factNumber]);

  const { data, loading } = useFetch(
    `http://numbersapi.com/${factNumber}/trivia`
  );
  return (
    <div>
      {/* <button onClick={() => setShowHello(!showHello)}>Toggle</button>
      {showHello && <Hello />} */}
      <div>{!data ? "loading..." : data}</div>
      <div>factNumber: {factNumber}</div>
      <button onClick={() => setFactNumber((c) => c + 1)}>increment</button>
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

      <input
        name="email"
        value={values.email}
        onChange={setValues}
        placeholder="email"
      />
      <input
        type="text"
        name="firstName"
        placeholder="first name"
        value={values.firstName}
        onChange={setValues}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={values.password}
        onChange={setValues}
      />
    </div>
  );
};

export default App;
