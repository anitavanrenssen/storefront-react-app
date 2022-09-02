import React, { Component } from "react";
import DropdownArrow from "../UI/DropdownArrow";
import classes from "./HeaderCurrencySwitcherButton.module.css";

class HeaderCurrencySwitcherButton extends Component {
  render() {
    return (
      <button className={classes.button} onClick={this.props.onClick}>
        <span className={classes.symbol}>$</span>
        <DropdownArrow />
      </button>
    );
  }
}

export default HeaderCurrencySwitcherButton;
