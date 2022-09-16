import React, { Component } from "react";
import { ReactComponent as CartIcon } from "../../assets/carticon-product.svg";
import classes from "./ProductCartButton.module.css";

class ProductCartButton extends Component {
  render() {
    return (
      <button
        className={classes.button}
        onClick={this.props.onClick}
        disabled={!this.props.inStock}
      >
        <CartIcon />
      </button>
    );
  }
}

export default ProductCartButton;
