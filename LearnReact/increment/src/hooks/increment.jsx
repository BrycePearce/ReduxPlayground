import { useState, useEffect } from "react";

function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, delay);
  });
}

const useNumberEase = (initialState) => {
  const [state, setState] = useState({
    value: initialState,
    target: initialState,
  });
  const [hasReachedTarget, sethasReachedTarget] = useState(true);

  useEffect(() => {
    if (state.value !== state.target) {
      sethasReachedTarget(false);
      stepTowardsNumber();
    } else {
      sethasReachedTarget(true);
    }
  }, [state]);

  const stepTowardsNumber = async () => {
    await wait(1000 / 30);
    setState((prev) =>
      prev.value < prev.target
        ? { ...prev, value: prev.value + 1 }
        : { ...prev, value: prev.value - 1 }
    );
  };

  const setTarget = (value) => {
    setState((prev) => {
      return { ...prev, target: value };
    });
  };

  return {
    value: state.value,
    target: state.target,
    hasReachedTarget,
    setTarget,
  };
};

export default useNumberEase;
