import React, { Component } from "react";
import classes from "./Cart.module.css";
import CartList from "./CartList";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";

class Cart extends Component {
  static contextType = CartContext;

  render() {
    const { cart, totalAmount } = this.context;
    return (
      <div className={classes.containercart}>
        <h1 className={classes.heading}>Cart</h1>
        <div className={classes.containercartlist}>
          <CartList cart={cart} />
        </div>
        <div className={classes.totalcontainer}>
          <p>Tax 21%: </p>
          <p>Quantity: {cart && cart.length > 0 ? cart.length : 0}</p>
          <p>Total: {totalAmount}</p>
        </div>
        <Button>Order</Button>
      </div>
    );
  }
}

export default Cart;
