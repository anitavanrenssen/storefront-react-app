import React, { Component } from "react";

import CartGallery from "./CartGallery";
import CartAttributes from "./CartAttributes";
import PlusMinusButton from "../UI/PlusMinusButton";

import { CurrencyContext } from "../../store/contexts";

import classes from "./CartItem.module.css";

class CartItem extends Component {
  static contextType = CurrencyContext;

  constructor() {
    super();
    this.state = {
      selectedAttributes: [],
    };
  }

  addToCartHandler(selectedAttributes) {
    this.setState({
      selectedAttributes: selectedAttributes.selectedAttributes,
    });
  }

  render() {
    const { product, cartModalStyle } = this.props;

    const filteredCurrency = product.prices.filter((currency) => {
      return currency.currency.label === this.context.currency;
    });

    return (
      <div
        className={`${
          cartModalStyle ? classes["modal-cart-item"] : classes["cart-item"]
        } ${
          cartModalStyle &&
          product.attributes &&
          product.attributes.length > 2 &&
          classes["modal-cart-item-length"]
        }`}
      >
        <div>
          <div className={`${cartModalStyle && classes["modal-item-heading"]}`}>
            <h4
              className={`${
                cartModalStyle ? classes["modal-brand"] : classes["brand"]
              }`}
            >
              {product.brand}
            </h4>
            <h4
              className={`${
                cartModalStyle ? classes["modal-name"] : classes.name
              }`}
            >
              {product.itemName}
            </h4>
            <div
              className={`${
                cartModalStyle ? classes["modal-price"] : classes.price
              }`}
            >
              {filteredCurrency[0].currency.symbol}
              {filteredCurrency[0].amount}
            </div>
            {!product.attributes ||
              (product.attributes.length > 0 && (
                <CartAttributes
                  product={product}
                  cartModalStyle={cartModalStyle}
                />
              ))}
          </div>
        </div>
        <div
          className={`${
            cartModalStyle
              ? classes["modal-amount-gallery"]
              : classes["amount-gallery"]
          }`}
        >
          <div
            className={`${
              cartModalStyle
                ? classes["modal-amount-container"]
                : classes["amount-container"]
            }`}
          >
            <button
              className={classes["plus-button"]}
              onClick={this.props.onAdd}
            >
              <div
                className={
                  cartModalStyle ? classes["modal-plus"] : classes.plus
                }
              >
                <PlusMinusButton cartModalStyle={cartModalStyle} />
              </div>

              <PlusMinusButton cartModalStyle={cartModalStyle} />
            </button>
            <span>{product.qty}</span>
            <button
              className={classes["minus-button"]}
              onClick={this.props.onRemove}
            >
              <PlusMinusButton cartModalStyle={cartModalStyle} />
            </button>
          </div>
          <CartGallery
            gallery={product.gallery}
            name={product.itemName}
            cartModalStyle={cartModalStyle}
          />
        </div>
      </div>
    );
  }
}

export default CartItem;
