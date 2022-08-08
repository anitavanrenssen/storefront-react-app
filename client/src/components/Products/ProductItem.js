import React, { Component } from "react";
import classes from "./ProductItem.module.css";

class ProductItem extends Component {
  render() {
    return (
      <div>
        <img
          src={this.props.product.gallery}
          className={classes.image}
          alt={this.props.product.name}
        />
        <div>{this.props.product.name}</div>
      </div>
    );
  }
}

export default ProductItem;
