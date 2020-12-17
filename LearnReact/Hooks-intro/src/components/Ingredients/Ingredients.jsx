import React, { useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  // useCallback will cache the function, so that when the component re-renders, this specific function will not re-create. So that when passing this function as a prop
  // it will not update the child component (causing it to re-render) and cause an infinite loop
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []); // could pass filteredIngredients here, but don't actually have to

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
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
        setIsLoading(false);
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setIsLoading(true);
    fetch(
      `https://react-hooks-update-b0cfc-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        setIsLoading(false);

        setUserIngredients((prevIngredients) =>
          prevIngredients.filter(
            (prevIngredient) => prevIngredient.id !== ingredientId
          )
        );
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
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
