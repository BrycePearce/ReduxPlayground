import React from "react";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((key) => (
    <li key={key}>
      <span style={{ textTransform: "capitalize" }}>{key}</span>:
      {props.ingredients[key]}
    </li>
  ));
  return (
    <li>
      <h3>Your Order</h3>
      <p>A burg with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </li>
  );
};

export default orderSummary;
