import React, { Component } from "react";
import DropdownArrow from "../UI/DropdownArrow";
import classes from "./HeaderCurrencySwitcherButton.module.css";
import { CurrencyContext } from "../../store/contexts";

class HeaderCurrencySwitcherButton extends Component {
  static contextType = CurrencyContext;
  render() {
    // const filteredCurrency = this.props.product.prices.filter((currency) => {
    //   return currency.currency.label === this.context.currency;

    return (
      <button className={classes.button} onClick={this.props.onClick}>
        <span className={classes.symbol}>$</span>
        <DropdownArrow onDropdown={this.props.onShow} />
      </button>
    );
  }
}

export default HeaderCurrencySwitcherButton;
