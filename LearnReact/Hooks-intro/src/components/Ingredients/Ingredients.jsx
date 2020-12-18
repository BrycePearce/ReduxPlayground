import React, { useReducer, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

import Search from "./Search";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Something went wrong!");
  }
};

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...currHttpState, loading: false }; // keep current values except for loading
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...currHttpState, error: null };
    default:
      throw new Error("Oof");
  }
};
const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  // useCallback will cache the function, so that when the component re-renders, this specific function will not re-create. So that when passing this function as a prop
  // it will not update the child component (causing it to re-render) and cause an infinite loop
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
    // setUserIngredients(filteredIngredients);
  }, []); // could pass filteredIngredients here, but don't actually have to

  const addIngredientHandler = (ingredient) => {
    dispatchHttp({ type: "SEND" });
    fetch(
      "https://react-hooks-update-b0cfc-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredient },
        });
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    dispatchHttp({ type: "SEND" });
    fetch(
      `https://react-hooks-update-b0cfc-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({
          type: "DELETE",
          id: ingredientId,
        });
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", errorMessage: "Something went wrong" });
      });
  };

  const clearError = () => {
    dispatchHttp({ type: "CLEAR" });
  };

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
