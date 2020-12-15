import React from "react";

import "./IngredientList.css";

const IngredientList = (props) => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((ig) => (
          <li key={ig.id}>
            <span>{ig.title}</span>
            <span>
              {ig.amount}{" "}
              <button onClick={props.onRemoveItem.bind(this, ig.id)}>x</button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
