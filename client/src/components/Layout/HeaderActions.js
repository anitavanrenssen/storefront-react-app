import React, { Component } from "react";

import HeaderCurrencySwitcher from "./HeaderCurrencySwitcher";
import HeaderCartButton from "./HeaderCartButton";

import classes from "./HeaderActions.module.css";

class HeaderActions extends Component {
  render() {
    return (
      <div className={classes.actions}>
        <HeaderCurrencySwitcher />
        <div>
          <HeaderCartButton onClick={this.props.onShowCart} />
        </div>
      </div>
    );
  }
}

export default HeaderActions;
