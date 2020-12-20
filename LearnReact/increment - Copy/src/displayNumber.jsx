import React from "react";
import useNumberEase from "./hooks/increment";

const DisplayNumber = React.memo((props) => {
  const { counter, target, hasReachedTarget, setTarget } = useNumberEase(10);

  return (
    <div>
      <p>{`${counter} => ${target}`}</p>
      <p>{`hasReachedTarget: ${hasReachedTarget}`}</p>
      <p>
        <button onClick={() => setTarget(Math.trunc(Math.random() * 100))}>
          New Target
        </button>
      </p>
    </div>
  );
});

export default DisplayNumber;
