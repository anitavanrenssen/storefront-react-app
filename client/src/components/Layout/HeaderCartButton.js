import React, { Component } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

class HeaderCartButton extends Component {
  static contextType = CartContext;
  render() {
    const { cart } = this.context;
    return (
      <div className={classes.buttonbadge}>
        <button className={classes.button} onClick={this.props.onClick}>
          <CartIcon />
          <div className={classes.badge}>
            <span className={classes.badgenumber}>
              {cart && cart.length > 0 ? cart.length : 0}
            </span>
          </div>
        </button>
      </div>
    );
  }
}

export default HeaderCartButton;
