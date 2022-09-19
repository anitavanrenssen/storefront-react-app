import React, { Component } from "react";

import HeaderCurrencySwitcherButton from "./HeaderCurrencySwitcherButton";
import HeaderCartButton from "./HeaderCartButton";

import classes from "./HeaderActions.module.css";

class HeaderActions extends Component {
  render() {
    return (
      <div className={classes.actions}>
        <HeaderCurrencySwitcherButton
          onClick={this.props.onShowCurrencySwitcher}
          onShow={this.props.onShow}
        />

        <div>
          <HeaderCartButton onClick={this.props.onShowCart} />
        </div>
      </div>
    );
  }
}

export default HeaderActions;
