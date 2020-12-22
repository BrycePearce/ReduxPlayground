import { useState, useEffect, useCallback } from "react";

// function wait(time) {
//   return new Promise((resolve) => {
//     return setTimeout(() => resolve(), time);
//   });
// }
const useNumberEase = (initialState) => {
  const [state, setState] = useState({
    current: initialState,
    target: initialState,
  });

  const [reachedTarget, setHasReachedTarget] = useState(true);

  const moveTowardsNum = useCallback(() => {
    // await wait(1000 / 30);
    if (state.current < state.target) {
      setState((oldState) => ({
        ...oldState,
        current: oldState.current + 1,
      }));
    } else {
      setState((oldState) => ({
        ...oldState,
        current: oldState.current - 1,
      }));
    }
  }, [state]);

  useEffect(() => {
    if (state.current !== state.target) {
      setHasReachedTarget(false);
      moveTowardsNum();
    } else {
      setHasReachedTarget(true);
    }
  }, [state, moveTowardsNum]);

  const setTarget = (target) => {
    setState({ ...state, target });
  };
  return {
    counter: state.current,
    target: state.target,
    hasReachedTarget: reachedTarget,
    setTarget,
  };
};

export default useNumberEase;
