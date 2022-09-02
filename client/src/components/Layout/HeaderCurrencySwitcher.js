import React, { Component } from "react";
import { gql } from "graphql-tag";
import { Query } from "@apollo/client/react/components";

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
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.clickOutsideHandler = this.clickOutsideHandler.bind(this);
  }

  clickOutsideHandler(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      this.props.onClickOutside && this.props.onClickOutside();
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.clickOutsideHandler, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickOutsideHandler, true);
  }

  render() {
    if (!this.props.show) return null;

    return (
      <div ref={this.ref}>
        <ul className={classes.dropdownlist}>
          <Query query={CURRENCIES_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error! ${error.message}</p>;
              const { currencies } = data;
              return currencies.map((currency, index) => {
                return (
                  <li key={index}>
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
