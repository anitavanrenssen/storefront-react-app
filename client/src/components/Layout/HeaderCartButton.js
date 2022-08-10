import React, { Component } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

class HeaderCartButton extends Component {
  render() {
    return (
      <div className={classes.buttonbadge}>
        <button className={classes.button} onClick={this.props.onClick}>
          <CartIcon />
          <div className={classes.badge}>
            <span className={classes.badgenumber}>3</span>
          </div>
        </button>
      </div>
    );
  }
}

export default HeaderCartButton;
