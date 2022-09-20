import React, { Component } from "react";

import { gql } from "graphql-tag";
import { Query } from "@apollo/client/react/components";

import { CurrencyContext } from "../../store/contexts";

import classes from "./CurrencySymbol.module.css";

const CURRENCIES_QUERY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

class CurrencySymbol extends Component {
  static contextType = CurrencyContext;

  render() {
    return (
      <Query query={CURRENCIES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;
          const { currencies } = data;
          const filteredCurrency = currencies.filter((currency) => {
            return currency.label === this.context.currency;
          });
          return (
            <span
              className={`${
                this.props.currencySwitcherStyle && classes.symbol
              }`}
            >
              {filteredCurrency[0].symbol}
            </span>
          );
        }}
      </Query>
    );
  }
}

export default CurrencySymbol;
