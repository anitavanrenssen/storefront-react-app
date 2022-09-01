import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import ProductCartButton from "./ProductCartButton";
import classes from "./ProductItem.module.css";
import CartContext from "../../store/cart-context";

class ProductItem extends Component {
  static contextType = CartContext;

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

  addToCartHandler(product) {
    this.context.addItem({
      id: product.id,
      itemName: product.name,
      gallery: product.gallery,
      prices: product.prices,
      brand: product.brand,
      qty: 1,
    });
  }

  render() {
    return (
      <Card>
        <Link
          to={`/product/${this.props.product.id}`}
          className={classes.productlink}
        >
          <div
            id={this.props.product.id}
            className={classes.item}
            onMouseEnter={this.mouseEnterHandler.bind(this)}
            onMouseLeave={this.mouseLeaveHandler.bind(this)}
          >
            <div className={classes.image}>
              <img
                src={this.props.product.gallery[0]}
                alt={this.props.product.name}
              />
              {this.props.product.attributes.length === 0 &&
                this.state.showCartButton && (
                  <ProductCartButton
                    onClick={this.addToCartHandler.bind(
                      this,
                      this.props.product
                    )}
                  />
                )}
              {!this.props.product.inStock && (
                <div className={classes.outofstock}>Out of Stock</div>
              )}
            </div>

            <div className={classes.content}>
              <p className={classes.title}>
                {this.props.product.brand} {this.props.product.name}
              </p>
              <p className={classes.price}>
                {this.props.product.prices[0].currency.symbol}
                {this.props.product.prices[0].amount}
              </p>
            </div>
          </div>
        </Link>
      </Card>
    );
  }
}

export default ProductItem;
