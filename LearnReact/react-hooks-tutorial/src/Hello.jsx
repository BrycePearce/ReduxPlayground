import React, { useEffect } from "react";

const Hello = () => {
  // useEffect (for stuff to be called less, and clean up after renders)
  useEffect(() => {
    console.log("mounted!");
    return () => {
      console.log("runs on unmount");
    };
  }, []);
  return <div>Hello</div>;
};

export default Hello;
