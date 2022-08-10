import React, { Component } from "react";
import { gql } from "graphql-tag";
import { Query } from "@apollo/client/react/components";

import DropdownArrow from "../UI/DropdownArrow";
import classes from "./HeaderCurrencySwitcher.module.css";

const CURRENCIES_QUERY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

class HeaderCurrencySwitcher extends Component {
  constructor() {
    super();
    this.state = {
      showDropdownList: false,
    };
  }

  toggleDropdownHandler() {
    this.setState((curState) => {
      return { showDropdownList: !curState.showDropdownList };
    });
  }

  render() {
    return (
      <div>
        <button
          className={classes.button}
          onClick={this.toggleDropdownHandler.bind(this)}
        >
          <span className={classes.symbol}>$</span>
          <DropdownArrow />
        </button>
        {this.state.showDropdownList && (
          <ul className={classes.dropdownlist}>
            <Query query={CURRENCIES_QUERY}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error! ${error.message}</p>;
                const { currencies } = data;
                return currencies.map((currency) => {
                  return (
                    <li>
                      <span>{currency.symbol}</span>
                      <span>{currency.label}</span>
                    </li>
                  );
                });
              }}
            </Query>
          </ul>
        )}
      </div>
    );
  }
}

export default HeaderCurrencySwitcher;
