import React, { Component } from "react";
import { CurrencyContext } from "./contexts";

const CURRENCY_KEY = "currency-storage-key";

class CurrencyProvider extends Component {
  constructor() {
    super();
    this.state = {
      currency: "",
    };
  }

  changeCurrencyHandler(id) {
    this.setState({ currency: id });
  }

  componentDidUpdate() {
    localStorage.setItem(CURRENCY_KEY, JSON.stringify(this.state));
  }

  componentDidMount() {
    if (localStorage.getItem(CURRENCY_KEY)) {
      let data = JSON.parse(localStorage.getItem(CURRENCY_KEY));
      let currency = data.currency;
      this.setState({
        currency: currency,
      });
    }
  }

  render() {
    const currencyContext = {
      currency: this.state.currency,
      changeCurrency: this.changeCurrencyHandler.bind(this),
    };

    return (
      <CurrencyContext.Provider value={currencyContext}>
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyProvider;
