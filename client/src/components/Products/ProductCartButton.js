import React, { Component } from "react";

import CartIconWhite from "../Cart/CartIconWhite";
import classes from "./ProductCartButton.module.css";

class ProductCartButton extends Component {
  cartClickHandler() {}

  render() {
    return (
      <button className={classes.button} onClick={this.cartClickHandler}>
        <CartIconWhite />
      </button>
    );
  }
}

export default ProductCartButton;
