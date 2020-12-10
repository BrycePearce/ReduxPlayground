import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

// https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

// Container components like this are concerned with how things work

// Functional components deal with how things look

class BurgerBuilder extends Component {
  // old
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }
  // new

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 3,
      meat: 0,
    },
    totalPrice: 4,
  };

  addIngredientHandler = (type) => {
    // update ingredients display
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    // update price totals
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  removeIngredientHandler = (type) => {};

  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls ingredientAdded={this.addIngredientHandler} />
      </>
    );
  }
}

export default BurgerBuilder;
