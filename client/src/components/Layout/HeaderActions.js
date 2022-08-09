import React, { Component } from "react";

import DropdownArrow from "../UI/DropdownArrow";
import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderActions.module.css";

class HeaderActions extends Component {
  render() {
    return (
      <div className={classes.actions}>
        <div className={classes.currencies}>
          <span className={classes.symbol}>$</span>
          <DropdownArrow />
        </div>
        <div>
          <CartIcon />
        </div>
      </div>
    );
  }
}

export default HeaderActions;
