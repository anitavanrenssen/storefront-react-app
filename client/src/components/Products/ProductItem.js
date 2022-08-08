import React, { Component } from "react";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

class ProductItem extends Component {
  render() {
    return (
      <Card>
        <div className={classes.item}>
          <img
            src={this.props.product.gallery[0]}
            className={classes.image}
            alt={this.props.product.name}
          />

          <div className={classes.content}>
            <p className={classes.title}>{this.props.product.name}</p>
            <p className={classes.price}>
              {this.props.product.prices[0].currency.symbol}
              {this.props.product.prices[0].amount}
            </p>
          </div>
        </div>
      </Card>
    );
  }
}

export default ProductItem;
