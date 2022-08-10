import React, { Component } from "react";

import CartIconWhite from "../Cart/CartIconWhite";
import classes from "./ProductCartButton.module.css";

class ProductCartButton extends Component {
  render() {
    return (
      <button className={classes.button}>
        <CartIconWhite />
      </button>
    );
  }
}

export default ProductCartButton;
