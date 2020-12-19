import React, { useState, useEffect, useRef } from "react";

import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";
import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const { onLoadIngredients } = props;
  const inputRef = useRef(); // setTimeout will use the old value due to closures, and we want the latest value. So we use useRef()
  const { isLoading, data, error, sendRequest, clear } = useHttp();
  useEffect(() => {
    // we store timer in a variable so that we can clean it up in useeffects return function. Whenever a user keystroke it starts a new timer
    // but we only care about the latest timer, and don't want to keep references to older timers, so store the timeout in this timer.
    const timer = setTimeout(() => {
      // if the value when we set the time (enteredFilter)
      // is the same as the current value (inputRef)
      // then we go ahead and search, because that's what the user must be searching for
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest(
          "https://react-hooks-update-b0cfc-default-rtdb.firebaseio.com/ingredients.json" +
            query,
          "GET"
        );
      }
    }, 500);
    return () => {
      // cleans up the previous effect function, and then we can run a new effect
      // this way we only have 1 settimeout going at a time, say if a user types 100 characters quickly, there will only be one timeout going
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]); // Runs on init always. But, whenever the filter updates, or when we first load ingredients, run this effect (effect will run when either of these values change)

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
