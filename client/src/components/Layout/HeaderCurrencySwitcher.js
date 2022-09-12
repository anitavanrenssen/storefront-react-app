import React, { Component } from "react";
import { gql } from "graphql-tag";
import { Query } from "@apollo/client/react/components";
import { CurrencyContext } from "../../store/contexts";

import classes from "./HeaderCurrencySwitcher.module.css";
// import HeaderCurrencySwitcherButton from "./HeaderCurrencySwitcherButton";

const CURRENCIES_QUERY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

class HeaderCurrencySwitcher extends Component {
  static contextType = CurrencyContext;

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.clickOutsideHandler = this.clickOutsideHandler.bind(this);
  }

  clickOutsideHandler(event) {
    if (
      this.ref.current &&
      !this.ref.current.contains(event.target)
      // &&
      // !this.ref.current.contains(<HeaderCurrencySwitcherButton />)
    ) {
      this.props.onClickOutside && this.props.onClickOutside();
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.clickOutsideHandler, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickOutsideHandler, true);
  }

  changeCurrencyHandler(e) {
    this.context.changeCurrency(e.target.id);
  }

  render() {
    if (!this.props.show) return null;

    // const { currency } = this.context;

    return (
      <div ref={this.ref}>
        <ul className={classes.dropdownlist} onClick={this.props.onClick}>
          <Query query={CURRENCIES_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error! ${error.message}</p>;
              const { currencies } = data;
              return currencies.map((currency, index) => {
                return (
                  <li
                    className={`${classes.listitem} ${
                      this.context.currency === currency.label && classes.active
                    }`}
                    key={index}
                    id={currency.label}
                    onClick={this.changeCurrencyHandler.bind(this)}
                  >
                    <span>{currency.symbol}</span>
                    <span>{currency.label}</span>
                  </li>
                );
              });
            }}
          </Query>
        </ul>
      </div>
    );
  }
}

export default HeaderCurrencySwitcher;
