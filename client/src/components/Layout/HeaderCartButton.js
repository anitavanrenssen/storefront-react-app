import React, { Component } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { CartContext } from "../../store/contexts";

class HeaderCartButton extends Component {
  static contextType = CartContext;

  render() {
    const { cart } = this.context;

    const numberOfCartItems = cart.reduce((curNumber, item) => {
      return curNumber + item.qty;
    }, 0);

    return (
      <div className={classes.buttonbadge}>
        <button className={classes.button} onClick={this.props.onClick}>
          <CartIcon />
          <div className={classes.badge}>
            <span className={classes.badgenumber}>
              {cart ? numberOfCartItems : 0}
            </span>
          </div>
        </button>
      </div>
    );
  }
}

export default HeaderCartButton;
