import React, { Component } from "react";
import classes from "./Cart.module.css";
import CartList from "./CartList";

class Cart extends Component {
  render() {
    return (
      <div className={classes.containercart}>
        <h1 className={classes.heading}>Cart</h1>
        <div className={classes.containercartlist}>
          <CartList />
        </div>
      </div>
    );
  }
}

export default Cart;
