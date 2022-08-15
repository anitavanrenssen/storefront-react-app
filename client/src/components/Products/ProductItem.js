import React, { Component } from "react";
import Card from "../UI/Card";
import ProductCartButton from "./ProductCartButton";
import classes from "./ProductItem.module.css";

class ProductItem extends Component {
  constructor() {
    super();
    this.state = {
      showCartButton: false,
    };
  }

  mouseEnterHandler() {
    this.setState((curState) => {
      return { showCartButton: true };
    });
  }

  mouseLeaveHandler() {
    this.setState((curState) => {
      return { showCartButton: false };
    });
  }

  getIDHandler(e) {
    console.log(e.target);
  }

  render() {
    return (
      <Card>
        <div
          key={this.props.product.id}
          className={classes.item}
          onMouseEnter={this.mouseEnterHandler.bind(this)}
          onMouseLeave={this.mouseLeaveHandler.bind(this)}
          onClick={this.getIDHandler.bind(this)}
        >
          <div className={classes.image}>
            <img
              src={this.props.product.gallery[0]}
              alt={this.props.product.name}
            />
            {this.state.showCartButton && <ProductCartButton />}
            {!this.props.product.inStock && (
              <div className={classes.outofstock}>Out of Stock</div>
            )}
          </div>

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
