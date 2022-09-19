import React, { Component } from "react";
import { ReactComponent as CartIcon } from "../../assets/carticon-header.svg";

import { CartContext } from "../../store/contexts";

import classes from "./HeaderCartButton.module.css";

class HeaderCartButton extends Component {
  static contextType = CartContext;

  render() {
    const { cart, totalCartItems } = this.context;

    return (
      <div className={classes["button-badge"]}>
        <button className={classes.button} onClick={this.props.onClick}>
          <CartIcon />
          <div className={classes.badge}>
            <span className={classes["badge-number"]}>
              {cart ? totalCartItems : 0}
            </span>
          </div>
        </button>
      </div>
    );
  }
}

export default HeaderCartButton;
