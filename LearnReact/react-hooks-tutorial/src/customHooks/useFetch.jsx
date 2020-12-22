import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loading: false });
  useEffect(() => {
    setState((oldState) => ({ data: oldState.data, loading: true }));
    fetch(url)
      .then((res) => res.text())
      .then((y) => {
        setState({ data: y, loading: false });
      });
  }, [url]);

  return state;
};
