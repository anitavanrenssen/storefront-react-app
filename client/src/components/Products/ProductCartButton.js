import React, { Component } from "react";

import CartIconWhite from "../Cart/CartIconWhite";
import classes from "./ProductCartButton.module.css";

class ProductCartButton extends Component {
  render() {
    return (
      <button
        className={classes.button}
        onClick={this.props.onClick}
        disabled={!this.props.inStock}
      >
        <CartIconWhite />
      </button>
    );
  }
}

export default ProductCartButton;
