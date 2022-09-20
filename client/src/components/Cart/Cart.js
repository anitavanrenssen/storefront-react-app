import React, { Component } from "react";

import CartList from "./CartList";
import Button from "../UI/Button";
import CartTotal from "./CartTotal";

import { CartContext } from "../../store/contexts";
import { CurrencyContext } from "../../store/contexts";

import classes from "./Cart.module.css";

class Cart extends Component {
  static contextType = CartContext;

  render() {
    const { cart, totalCartItems } = this.context;

    return (
      <div className={classes["cart-container"]}>
        <h1 className={classes.heading}>Cart</h1>
        <section>
          <CartList cart={cart} cartStyle={true} />
        </section>
        <section className={classes["cart-totals"]}>
          <div className={classes["cart-total-headings"]}>
            <p>Tax 21%:</p>
            <p>Quantity:</p>
            <p>Total:</p>
          </div>
          <div>
            <CartContext.Consumer>
              {(cart) => (
                <CurrencyContext.Consumer>
                  {(currency) => (
                    <CartTotal
                      cart={cart}
                      currency={currency}
                      quantity={totalCartItems}
                      cartStyle={true}
                    />
                  )}
                </CurrencyContext.Consumer>
              )}
            </CartContext.Consumer>
          </div>
        </section>
        <Button inStock={true}>Order</Button>
      </div>
    );
  }
}

export default Cart;
