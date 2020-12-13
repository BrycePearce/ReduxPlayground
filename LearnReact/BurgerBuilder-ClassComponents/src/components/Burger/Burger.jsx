import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientKey) => {
      return [
        ...new Array(props.ingredients[ingredientKey]),
      ].map((_, index) => (
        <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
      ));
    })
    .flat();
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Add stuff</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
