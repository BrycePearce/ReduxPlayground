import React from "react";
import classes from "./NavigationItems.module.css";

import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    {/* active passes as true here*/}
    <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>{" "}
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default NavigationItems;
