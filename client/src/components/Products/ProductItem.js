import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import ProductCartButton from "./ProductCartButton";
import classes from "./ProductItem.module.css";
import { CartContext } from "../../store/contexts";

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
      id: product.id + "[]",
      itemName: product.name,
      gallery: product.gallery,
      prices: product.prices,
      brand: product.brand,
      qty: 1,
    });
  }

  render() {
    const filteredCurrency = this.props.product.prices.filter((price) => {
      return price.currency.label === this.props.currency.currency;
    });

    return (
      <Card>
        <div
          className={classes.productcard}
          onMouseEnter={this.mouseEnterHandler.bind(this)}
          onMouseLeave={this.mouseLeaveHandler.bind(this)}
        >
          <Link
            to={`/product/${this.props.product.id}`}
            className={classes.productlink}
          >
            <div id={this.props.product.id} className={classes.item}>
              <div className={classes.image}>
                <img
                  src={this.props.product.gallery[0]}
                  alt={this.props.product.name}
                />

                {!this.props.product.inStock && (
                  <div className={classes.outofstock}>Out of Stock</div>
                )}
              </div>

              <div className={classes.content}>
                <p className={classes.title}>
                  {this.props.product.brand} {this.props.product.name}
                </p>
                <p className={classes.price}>
                  {filteredCurrency[0].currency.symbol}
                  {filteredCurrency[0].amount}
                </p>
              </div>
            </div>
          </Link>
          {this.props.product.attributes.length === 0 &&
            this.state.showCartButton && (
              <ProductCartButton inStock={this.props.product.inStock}
                onClick={this.addToCartHandler.bind(
                  this,

                  this.props.product
                )}
              />
            )}
        </div>
      </Card>
    );
  }
}

export default ProductItem;
