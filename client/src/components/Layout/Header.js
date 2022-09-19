import React, { Component } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import gql from "graphql-tag";
import { Query } from "@apollo/client/react/components";

import HeaderNavigation from "./HeaderNavigation";
import HeaderActions from "./HeaderActions";

import classes from "./Header.module.css";

const CATEGORIES_QUERY = gql`
  {
    categories {
      name
    }
  }
`;

class Header extends Component {

  render() {
    return (
      <header className={classes.header}>
        <Query query={CATEGORIES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error! ${error.message}</p>;
            const { categories } = data;
            return (
              <HeaderNavigation
                categories={categories}
              />
            );
          }}
        </Query>
        <Logo />
        <HeaderActions
          onShowCart={this.props.onShowCart}
          onShowCurrencySwitcher={this.props.onShowCurrencySwitcher}
          onShow={this.props.show}
        />
      </header>
    );
  }
}

export default Header;
