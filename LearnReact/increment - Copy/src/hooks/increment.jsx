import { useState, useEffect, useCallback } from "react";

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
}
const useNumberEase = (initialState) => {
  const [state, setState] = useState({
    counter: initialState,
    target: initialState,
  });
  const [hasReachedTarget, setHasReachedTarget] = useState(true);

  const moveToNumber = useCallback(async () => {
    await wait(1000 / 30);
    if (state.counter < state.target) {
      setState((prev) => ({ ...prev, counter: prev.counter + 1 }));
    } else {
      setState((prev) => ({ ...prev, counter: prev.counter - 1 }));
    }
  }, [state]);

  useEffect(() => {
    if (state.counter !== state.target) {
      setHasReachedTarget(false);
      moveToNumber();
    } else {
      setHasReachedTarget(true);
    }
  }, [state, moveToNumber]);

  const setTarget = (target) => {
    setState((prev) => ({ ...prev, target: target }));
  };

  return {
    setTarget,
    hasReachedTarget,
    counter: state.counter,
    target: state.target,
  };
};

export default useNumberEase;
