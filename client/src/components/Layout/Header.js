import React, { Component } from "react";

import Logo from "../UI/Logo";
import HeaderActions from "./HeaderActions";

import classes from "./Header.module.css";

class Header extends Component {
  render() {
    return (
      <header className={classes.header}>
        <nav className={classes.nav}>
          <ul className={classes.navlinks}>
            <li>All</li>
            <li>Clothes</li>
            <li>Tech</li>
          </ul>
        </nav>
        <Logo />
        <HeaderActions onShowCart={this.props.onShowCart} />
      </header>
    );
  }
}

export default Header;
