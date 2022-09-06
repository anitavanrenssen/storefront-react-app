import React, { Component } from "react";

import classes from "./Button.module.css";

class Button extends Component {
  render() {
    return (
      <button
      className={`${
        this.props.cartModalStyle ? classes.modalbutton : classes.button
      }`}
        type={this.props.type || "button"}
        onClick={this.props.onClick}
        disabled={!this.props.inStock}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
