import { Component } from "react";

import { CurrencyContext } from "../../store/contexts";

import classes from "./HeaderCurrency.module.css";

class HeaderCurrency extends Component {
  static contextType = CurrencyContext;

  changeCurrencyHandler(e) {
    this.context.changeCurrency(e.target.id);
  }

  render() {
    const { currency } = this.props;

    return (
      <li
        className={`${classes["list-item"]} ${
          this.context.currency === currency.label && classes.active
        }`}
        id={currency.label}
        onClick={this.changeCurrencyHandler.bind(this)}
      >
        <span>{currency.symbol}</span>
        <span>{currency.label}</span>
      </li>
    );
  }
}

export default HeaderCurrency;
