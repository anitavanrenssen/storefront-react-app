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
      <div className={classes.containercart}>
        <h1 className={classes.heading}>Cart</h1>
        <div className={classes.containercartlist}>
          <CartList cart={cart} cartStyle={true} />
        </div>
        <div className={classes.carttotals}>
          <div className={classes.carttotal}>
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
        </div>
        <Button inStock={true}>Order</Button>
      </div>
    );
  }
}

export default Cart;
