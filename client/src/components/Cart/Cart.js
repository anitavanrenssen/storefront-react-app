import React, { Component } from "react";
import classes from "./Cart.module.css";
import CartList from "./CartList";
import { CartContext } from "../../store/contexts";
import { CurrencyContext } from "../../store/contexts";
import Button from "../UI/Button";
import CartTotal from "./CartTotal";

class Cart extends Component {
  static contextType = CartContext;

  render() {
    const { cart } = this.context;

    // const amountTotal = totalAmount.toFixed(2);

    // const amountTax = (totalAmount * 0.21).toFixed(2);

    const numberOfCartItems = cart.reduce((curNumber, item) => {
      return curNumber + item.qty;
    }, 0);

    return (
      <div className={classes.containercart}>
        <h1 className={classes.heading}>Cart</h1>
        <div className={classes.containercartlist}>
          <CartList cart={cart} />
        </div>
        <div>
          <CartContext.Consumer>
            {(cart) => (
              <CurrencyContext.Consumer>
                {(currency) => (
                  <CartTotal
                    cart={cart}
                    currency={currency}
                    quantity={numberOfCartItems}
                  />
                )}
              </CurrencyContext.Consumer>
            )}
          </CartContext.Consumer>
        </div>
        <Button>Order</Button>
      </div>
    );
  }
}

export default Cart;
