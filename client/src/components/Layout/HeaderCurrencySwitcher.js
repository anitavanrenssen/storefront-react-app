import React, { Component } from "react";

import { gql } from "graphql-tag";
import { Query } from "@apollo/client/react/components";

import HeaderCurrency from "./HeaderCurrency";
import Modal from "../UI/Modal";

const CURRENCIES_QUERY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

class HeaderCurrencySwitcher extends Component {
  render() {
    return (
      <Modal currencySwitcher={true} onClose={this.props.onClose}>
        <div>
          <ul onClick={this.props.onClick}>
            <Query query={CURRENCIES_QUERY}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error! ${error.message}</p>;
                const { currencies } = data;
                return currencies.map((currency, index) => {
                  return (
                    <HeaderCurrency
                      key={index}
                      currencies={currencies}
                      currency={currency}
                      index={index}
                    />
                  );
                });
              }}
            </Query>
          </ul>
        </div>
      </Modal>
    );
  }
}

export default HeaderCurrencySwitcher;
