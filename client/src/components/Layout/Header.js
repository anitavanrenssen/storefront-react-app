import React, { Component } from "react";

import HeaderNavigation from "./HeaderNavigation";
import Logo from "../UI/Logo";
import HeaderActions from "./HeaderActions";

import classes from "./Header.module.css";

class Header extends Component {
  getCategoryHandler(category) {
    this.props.getCategory(category);
  }

  render() {
    return (
      <header className={classes.header}>
        <HeaderNavigation getCategory={this.getCategoryHandler.bind(this)} />
        <Logo />
        <HeaderActions onShowCart={this.props.onShowCart}  onShowCurrencySwitcher={this.props.onShowCurrencySwitcher} onShow={this.props.show}/>
      </header>
    );
  }
}

export default Header;
