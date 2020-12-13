import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

// https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

// Container components like this are concerned with how things work (a container is basically like a page)

// Functional components deal with how things look, the idea is no state, but can still have functions

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
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    canPurchase: false,
    purchasing: false,
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
    this.setState(
      { totalPrice: newPrice, ingredients: updatedIngredients },
      () => {
        this.updatePurchaseState();
      }
    );
  };

  removeIngredientHandler = (type) => {
    // update ingredients display
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    // update price totals
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;

    this.setState(
      { totalPrice: newPrice, ingredients: updatedIngredients },
      () => {
        this.updatePurchaseState();
      }
    );
  };

  updatePurchaseState = () => {
    const ingredients = { ...this.state.ingredients };
    const sum = Object.values(ingredients).reduce(
      (accum, curr) => (accum += curr),
      0
    );

    this.setState({ canPurchase: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You continue!");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients, // dereferences top level fields
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          canPurchase={this.state.canPurchase}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </>
    );
  }
}

export default BurgerBuilder;
