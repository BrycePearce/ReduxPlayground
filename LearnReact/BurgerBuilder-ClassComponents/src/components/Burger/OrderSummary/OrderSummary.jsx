import React from "react";

import Button from "../../UI/Button/Button";

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
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        Continue
      </Button>
    </li>
  );
};

export default orderSummary;
