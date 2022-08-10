import React, { Component } from "react";

import HeaderCurrencySwitcher from "./HeaderCurrencySwitcher";
import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderActions.module.css";

class HeaderActions extends Component {
  render() {
    return (
      <div className={classes.actions}>
        <HeaderCurrencySwitcher />
        <div>
          <CartIcon />
        </div>
      </div>
    );
  }
}

export default HeaderActions;
