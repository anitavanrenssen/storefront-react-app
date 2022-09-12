import React, { Component } from "react";
import CurrencySymbol from "../UI/CurrencySymbol";
import DropdownArrow from "../UI/DropdownArrow";
import classes from "./HeaderCurrencySwitcherButton.module.css";

class HeaderCurrencySwitcherButton extends Component {
  render() {
    return (
      <button className={classes.button} onClick={this.props.onClick}>
        <CurrencySymbol currencySwitcherStyle={true} />
        <DropdownArrow onDropdown={this.props.onShow} />
      </button>
    );
  }
}

export default HeaderCurrencySwitcherButton;
