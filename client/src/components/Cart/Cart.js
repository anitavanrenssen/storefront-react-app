import React, { Component } from "react";
import classes from "./Cart.module.css";
import CartList from "./CartList";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";

class Cart extends Component {
  static contextType = CartContext;

  render() {
    const { cart, totalAmount } = this.context;

    const amountTotal = totalAmount.toFixed(2);

    const amountTax = (totalAmount * 0.21).toFixed(2);

    const numberOfCartItems = cart.reduce((curNumber, item) => {
      return curNumber + item.qty;
    }, 0);

    return (
      <div className={classes.containercart}>
        <h1 className={classes.heading}>Cart</h1>
        <div className={classes.containercartlist}>
          <CartList cart={cart} />
        </div>
        <div className={classes.totalcontainer}>
          <p>Tax 21%: {amountTax}</p>
          <p>Quantity: {cart ? numberOfCartItems : 0}</p>
          <p>Total: {amountTotal}</p>
        </div>
        <Button>Order</Button>
      </div>
    );
  }
}

export default Cart;
