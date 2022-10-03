import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "../../UI/Card";
import ProductCartButton from "./ProductCartButton";

import { CartContext } from "../../../store/contexts";

import classes from "./ProductItem.module.css";

class ProductItem extends Component {
  static contextType = CartContext;

  constructor() {
    super();
    this.state = {
      showCartButton: false,
    };
  }

  mouseEnterHandler() {
    this.setState(() => {
      return { showCartButton: true };
    });
  }

  mouseLeaveHandler() {
    this.setState(() => {
      return { showCartButton: false };
    });
  }

  addToCartHandler(product) {
    if (product.attributes.length > 0) {
      const selectedAttributesObj = product.attributes.reduce((prev, curr) => {
        prev[curr.name] = curr.items[0].displayValue;
        return prev;
      }, {});

      this.context.addItem({
        id: product.id + JSON.stringify(selectedAttributesObj),
        itemName: product.name,
        gallery: product.gallery,
        selectedAttributes: selectedAttributesObj,
        attributes: product.attributes,
        prices: product.prices,
        brand: product.brand,
        qty: 1,
      });
    } else {
      this.context.addItem({
        id: product.id + "[]",
        itemName: product.name,
        gallery: product.gallery,
        prices: product.prices,
        brand: product.brand,
        qty: 1,
      });
    }
  }

  render() {
    const filteredCurrency = this.props.product.prices.filter((price) => {
      return price.currency.label === this.props.currency.currency;
    });

    return (
      <Card>
        <div
          className={classes["product-card"]}
          onMouseEnter={this.mouseEnterHandler.bind(this)}
          onMouseLeave={this.mouseLeaveHandler.bind(this)}
        >
          <Link
            to={`/product/${this.props.product.id}`}
            className={classes.link}
          >
            <div id={this.props.product.id} className={classes.item}>
              <section className={classes.image}>
                <img
                  src={this.props.product.gallery[0]}
                  alt={this.props.product.name}
                />
                {!this.props.product.inStock && (
                  <div className={classes["out-of-stock"]}>Out of Stock</div>
                )}
              </section>

              <section
                className={`${classes.content} ${
                  !this.props.product.inStock && classes["out-of-stock-content"]
                }`}
              >
                <p className={classes.title}>
                  {this.props.product.brand} {this.props.product.name}
                </p>
                <p className={classes.price}>
                  {filteredCurrency[0].currency.symbol}
                  {filteredCurrency[0].amount}
                </p>
              </section>
            </div>
          </Link>
          {this.state.showCartButton && (
            <ProductCartButton
              inStock={this.props.product.inStock}
              onClick={this.addToCartHandler.bind(this, this.props.product)}
            />
          )}
        </div>
      </Card>
    );
  }
}

export default ProductItem;
